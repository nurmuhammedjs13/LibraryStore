"use client";
import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import DeleteIcon from "@/assets/Icons/DeleteIcon";
import Minus from "@/assets/Icons/Minus";
import Plus from "@/assets/Icons/Plus";
import Price from "@/assets/Icons/Price";
import ImgStop from "@/assets/Icons/imgStop";
import styles from "./PlacinganOrder.module.scss";
import {
    useGetCartItemsQuery,
    useDeleteCartMutation,
    useUpdateQuantityMutation,
} from "@/redux/api/addToCart";
import { usePostRegDeliveryMutation } from "@/redux/api/regDelivery";
import { usePostRegPickUpMutation } from "@/redux/api/regPickup";
import { useGetMeQuery } from "@/redux/api/auth";
import { useGetRegDeliveryQuery } from "@/redux/api/regDelivery";
import axios from "axios";

interface CartItem {
    id: number;
    books: {
        id: number;
        book_images: Array<{
            book_images: string;
        }>;
        book_name: string;
        author: string;
        price: number;
    };
    quantity: number;
    books_id?: number;
}
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    comments: string;
    receipt?: File;
}

interface ValidationErrorResponse {
    status: number;
    data: {
        detail?: string;
        [key: string]: unknown;
    };
}

const PlacinganOrder = () => {
    const { data: cartData = [], isLoading } = useGetCartItemsQuery();
    const [deleteCartItem] = useDeleteCartMutation();
    const [postRegDelivery] = usePostRegDeliveryMutation();
    const { data: meData } = useGetMeQuery();
    const [postRegPickUp] = usePostRegPickUpMutation();
    const [updateQuantity] = useUpdateQuantityMutation();
    const { data: deliveryList, error: deliveryError } =
        useGetRegDeliveryQuery();

    const [activeButton, setActiveButton] = useState<"delivery" | "pickup">(
        "delivery"
    );
    const [validationError, setValidationError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        comments: "",
        receipt: undefined,
    });

    const TOKEN = process.env.NEXT_PUBLIC_OKUKG_TELEGRAM_BOT;
    const CHAT_ID = process.env.NEXT_PUBLIC_OKUKG_CHAT_ID;

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${hours}:${minutes} - ${day}-${month}-${year}`;
    };

    const uniqueCartItems = useMemo(() => {
        if (!Array.isArray(cartData)) return [];

        const seen = new Map<string, number>();
        const uniqueItems: CartItem[] = [];

        cartData.forEach((item) => {
            if (!item?.books) return;

            const key = `${item.books.id}-${item.books.book_name}-${item.books.author}`;

            if (seen.has(key)) {
                const existingItemIndex = seen.get(key)!;
                const updatedItem: CartItem = {
                    ...uniqueItems[existingItemIndex],
                    quantity:
                        uniqueItems[existingItemIndex].quantity + item.quantity,
                };
                uniqueItems[existingItemIndex] = updatedItem;

                deleteCartItem(item.id);
            } else {
                seen.set(key, uniqueItems.length);
                uniqueItems.push({
                    ...item,
                    books_id: item.books.id,
                });
            }
        });

        return uniqueItems;
    }, [cartData, deleteCartItem]);

    const handleDelete = async (id: number) => {
        try {
            await deleteCartItem(id).unwrap();
        } catch (error) {
            console.error("Error deleting item:", error);
            setValidationError("Ошибка при удалении товара");
        }
    };

    const handleQuantityChange = async (
        id: number,
        currentQuantity: number,
        increment: boolean
    ) => {
        const newQuantity = increment
            ? currentQuantity + 1
            : Math.max(1, currentQuantity - 1);
        try {
            await updateQuantity({ id, quantity: newQuantity }).unwrap();
        } catch (error) {
            console.error("Error updating quantity:", error);
            setValidationError("Ошибка при обновлении количества");
        }
    };

    const calculateTotalQuantity = () => {
        return uniqueCartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const calculateTotal = () => {
        return uniqueCartItems.reduce(
            (sum, item) => sum + item.books.price * item.quantity,
            0
        );
    };

    const sendToTelegram = async (orderData: {
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        delivery: string;
        created_at: string;
        text: string;
        client_address?: string;
        total_price: number;
        total_items: number;
        receipt?: File;
    }) => {
        if (!TOKEN || !CHAT_ID) {
            console.error("Telegram credentials not configured");
            return;
        }

        try {
            const sanitizeText = (text: string) => {
                return text.trim().replace(/[<>]/g, "");
            };

            // Сначала отправляем текстовое сообщение
            const messageTG = `
🛍 *НОВЫЙ ЗАКАЗ*

👤 *Информация о клиенте*
• Имя: ${sanitizeText(orderData.client_first_name)}
• Фамилия: ${sanitizeText(orderData.client_last_name)}
• Email: ${sanitizeText(orderData.client_email)}
• Телефон: ${sanitizeText(orderData.client_phone_number)}

📦 *Детали заказа*
• Тип доставки: ${orderData.delivery}
${
    orderData.client_address
        ? `• Адрес: ${sanitizeText(orderData.client_address)}\n`
        : ""
}
• Время заказа: ${formatDate(orderData.created_at)}
• Количество товаров: ${orderData.total_items}
• Общая сумма: ${orderData.total_price} сом

💭 *Комментарий*: ${
                orderData.text
                    ? sanitizeText(orderData.text)
                    : "Нет комментария"
            }`;

            await axios.post(
                `https://api.telegram.org/bot${TOKEN}/sendMessage`,
                {
                    chat_id: CHAT_ID,
                    parse_mode: "MarkdownV2",
                    text: messageTG.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&"),
                }
            );

            // Затем отправляем изображение чека, если оно есть
            if (orderData.receipt) {
                const formData = new FormData();
                formData.append("photo", orderData.receipt);
                formData.append("chat_id", CHAT_ID);
                formData.append("caption", "Чек об оплате");

                await axios.post(
                    `https://api.telegram.org/bot${TOKEN}/sendPhoto`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            console.log("✅ Уведомление успешно отправлено в Telegram");
        } catch (error) {
            console.error("❌ Ошибка отправки в Telegram:", error);
            if (axios.isAxiosError(error)) {
                console.error("Детали ошибки:", error.response?.data);
            }
        }
    };

    const handleSubmitOrder = async (e: FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            if (uniqueCartItems.length === 0) {
                throw new Error("Корзина пуста!");
            }

            const validationErrors: string[] = [];

            if (!formData.firstName) validationErrors.push("Имя обязательно");
            if (!formData.lastName)
                validationErrors.push("Фамилия обязательна");
            if (!formData.email) validationErrors.push("Email обязателен");
            if (!formData.phone)
                validationErrors.push("Номер телефона обязателен");
            if (activeButton === "delivery" && !formData.address) {
                validationErrors.push("Адрес доставки обязателен");
            }
            if (!formData.receipt) {
                validationErrors.push("Чек оплаты обязателен");
            }

            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join(", "));
            }

            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Пожалуйста, введите корректный email адрес");
            }

            // Валидация телефона
            let phoneNumber = formData.phone;
            if (!phoneNumber.startsWith("+996")) {
                phoneNumber = `+996${phoneNumber}`;
            }

            const phoneRegex = /^\+996\d{9}$/;
            if (!phoneRegex.test(phoneNumber)) {
                throw new Error(
                    "Пожалуйста, введите действительный номер телефона в формате +996XXXXXXXXX"
                );
            }

            if (!meData?.id) {
                throw new Error("Пользователь не авторизован");
            }

            const itemsToDelete = uniqueCartItems.map((item) => item.id);

            // Create FormData for submission
            const orderFormData = new FormData();
            orderFormData.append("client", String(meData.id));
            orderFormData.append("cart", "8");
            orderFormData.append("cart_id", "8");
            orderFormData.append(
                "client_first_name",
                formData.firstName.trim()
            );
            orderFormData.append("client_last_name", formData.lastName.trim());
            orderFormData.append("client_email", formData.email.trim());
            orderFormData.append("client_phone_number", formData.phone);
            orderFormData.append("text", formData.comments.trim());

            if (formData.receipt instanceof File) {
                orderFormData.append("check_order", formData.receipt);
            }

            const deliveryType =
                activeButton === "delivery" ? "доставка" : "самовывоз";
            const clientAddress =
                activeButton === "delivery"
                    ? formData.address?.trim() || "Адрес не указан"
                    : "Самовывоз";

            orderFormData.append("delivery", deliveryType);
            orderFormData.append("client_address", clientAddress);

            try {
                if (activeButton === "delivery") {
                    await postRegDelivery(orderFormData).unwrap();
                } else {
                    await postRegPickUp(orderFormData).unwrap();
                }

                // Отправка уведомления в Telegram
                await sendToTelegram({
                    client_first_name: formData.firstName.trim(),
                    client_last_name: formData.lastName.trim(),
                    client_email: formData.email.trim(),
                    client_phone_number: formData.phone,
                    delivery: deliveryType,
                    created_at: new Date().toISOString(),
                    text: formData.comments.trim(),
                    client_address: clientAddress,
                    total_price: calculateTotal(),
                    total_items: calculateTotalQuantity(),
                    receipt: formData.receipt,
                });

                // Очистка корзины после успешного заказа
                // for (const itemId of itemsToDelete) {
                //     try {
                //         await deleteCartItem(itemId).unwrap();
                //     } catch (error) {
                //         console.error("Ошибка при очистке корзины:", error);
                //     }
                // }

                // Сброс формы
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    address: "",
                    comments: "",
                    receipt: undefined,
                });

                // Очистка поля файла
                const fileInput = document.querySelector(
                    'input[type="file"]'
                ) as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = "";
                }

                alert(
                    `Заказ успешно оформлен! Тип: ${
                        activeButton === "delivery" ? "Доставка" : "Самовывоз"
                    }`
                );
                setValidationError("");
            } catch (error) {
                console.error("🚨 Ошибка оформления заказа:", error);
                if (error instanceof Error) {
                    setValidationError(error.message);
                } else if (typeof error === "object" && error !== null) {
                    const apiError = error as ValidationErrorResponse;
                    if (apiError.status === 415) {
                        setValidationError(
                            "Ошибка формата данных. Пожалуйста, проверьте формат загружаемых файлов."
                        );
                    } else if (apiError.status === 400) {
                        const errorMessages: string[] = [];
                        Object.entries(apiError).forEach(([key, value]) => {
                            if (Array.isArray(value)) {
                                errorMessages.push(...value);
                            }
                        });
                        setValidationError(
                            errorMessages.length > 0
                                ? errorMessages.join(", ")
                                : "Ошибка валидации данных. Пожалуйста, проверьте введенные данные."
                        );
                    } else if (apiError.status === 500) {
                        setValidationError(
                            "Ошибка сервера. Пожалуйста, попробуйте позже."
                        );
                    } else {
                        setValidationError(
                            "Произошла ошибка при оформлении заказа. Пожалуйста, проверьте данные и попробуйте снова."
                        );
                    }
                } else {
                    setValidationError(
                        "Произошла неизвестная ошибка при оформлении заказа."
                    );
                }
            }
        } catch (error) {
            console.error("🚨 Ошибка оформления заказа:", error);
            if (error instanceof Error) {
                setValidationError(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === "file") {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) {
                if (!file.type.startsWith("image/")) {
                    setValidationError("Пожалуйста, загрузите изображение");
                    return;
                }
                if (file.size > 5 * 1024 * 1024) {
                    setValidationError("Размер файла не должен превышать 5MB");
                    return;
                }
                setFormData((prev) => ({ ...prev, receipt: file }));
            }
        } else if (name === "phone") {
            let sanitizedValue = value.replace(/[^\d+]/g, "");

            if (!sanitizedValue.startsWith("+996")) {
                sanitizedValue =
                    "+996" + sanitizedValue.replace(/^\+?996?/, "");
            }

            if (sanitizedValue.length > 13) {
                sanitizedValue = sanitizedValue.slice(0, 13);
            }

            setFormData((prev) => ({ ...prev, phone: sanitizedValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        setValidationError("");
    };
    if (isLoading) {
        return (
            <div className={styles.loaderBlock}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    return (
        <div className={styles.mainBlock}>
            <div className="container">
                <div className={styles.block}>
                    <div className={styles.landmark}>
                        {uniqueCartItems.map((item) => (
                            <div className={styles.cardBlock} key={item.id}>
                                <div className={styles.ImgBlock}>
                                    <div className={styles.img}>
                                        <Image
                                            src={
                                                item.books.book_images[0]
                                                    .book_images
                                            }
                                            alt={item.books.book_name}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className={styles.ImgText}>
                                        <h2>{item.books.book_name}</h2>
                                        <h3>{item.books.author}</h3>
                                        <div
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.quantity}>
                                    <div
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity,
                                                false
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Minus />
                                    </div>
                                    <h1>{item.quantity}</h1>
                                    <div
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity,
                                                true
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Plus />
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    <Price />
                                    <h5>{item.books.price} сом</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form
                        onSubmit={handleSubmitOrder}
                        className={styles.mainInput}
                    >
                        <h1>Оформление заказа</h1>
                        {validationError && (
                            <div className={styles.errorMessage}>
                                {validationError}
                            </div>
                        )}
                        <div className={styles.InputBlock}>
                            <div className={styles.BlockBtn}>
                                <button
                                    type="button"
                                    className={`${styles.delivery} ${
                                        activeButton === "delivery"
                                            ? styles.activeDelivery
                                            : ""
                                    }`}
                                    onClick={() => setActiveButton("delivery")}
                                >
                                    Доставка
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.pickup} ${
                                        activeButton === "pickup"
                                            ? styles.activePickup
                                            : ""
                                    }`}
                                    onClick={() => setActiveButton("pickup")}
                                >
                                    Самовывоз
                                </button>
                            </div>
                            <div className={styles.Inputs}>
                                <div className={styles.Input}>
                                    <h6>Имя</h6>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <hr />
                                </div>
                                <div className={styles.Input}>
                                    <h6>Фамилия</h6>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <hr />
                                </div>
                                <div className={styles.Input}>
                                    <h6>gmail</h6>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <hr />
                                </div>
                                <div className={styles.Input}>
                                    <h6>Добавьте номер телефона</h6>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+996XXXXXXXXX"
                                        required
                                    />
                                    <hr />
                                </div>
                                {activeButton === "delivery" && (
                                    <div className={styles.Input}>
                                        <h6>Укажите адрес доставки</h6>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <hr />
                                    </div>
                                )}
                                <div className={styles.Input}>
                                    <h6>Комментарии к заказу</h6>
                                    <input
                                        type="text"
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleInputChange}
                                    />
                                    <hr />
                                </div>
                            </div>
                            <div className={styles.uploadFile}>
                                <div className={styles.text1}>
                                    <h4>
                                        Товары: {calculateTotalQuantity()}шт
                                    </h4>
                                    <h4>{calculateTotal()} сом</h4>
                                </div>
                                <div className={styles.text2}>
                                    <h4>
                                        Цену за доставку обговаривается с
                                        продавцом
                                    </h4>
                                </div>
                                <div className={styles.text3}>
                                    <h3>Итого</h3>
                                    <h3>{calculateTotal()} сом</h3>
                                </div>
                                <div className={styles.text4}>
                                    <h2>Загрузите чек оплаты</h2>
                                    <div className={styles.text5}>
                                        <p>Реквизиты в шапке страницы</p>
                                        <ImgStop />
                                    </div>
                                </div>
                                <div className={styles.upload}>
                                    <div className={styles.selectFile}>
                                        <input
                                            type="file"
                                            name="receipt"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit">
                                        Оформить заказ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlacinganOrder;
