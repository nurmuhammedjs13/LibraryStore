"use client";
import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import styles from "./PlacinganOrder.module.scss";
import Image from "next/image";
import DeleteIcon from "@/assets/Icons/DeleteIcon";
import Minus from "@/assets/Icons/Minus";
import Plus from "@/assets/Icons/Plus";
import Price from "@/assets/Icons/Price";
import ImgStop from "@/assets/Icons/imgStop";
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

interface OrderFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    comments: string;
    receipt?: File;
}

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

interface DeliveryListItem {
    id: number;
    client: number;
    delivery: string;
    cart: {
        items: CartItem;
        total_price: string;
    };
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_phone_number: string;
    text: string;
    created_at: string;
}

interface PostRegDeliveryRequest {
    delivery: "доставка";
    client: number;
    cart: number;
    cart_id: number;
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_phone_number: string;
    client_address: string;
    text: string;
}

interface PostRegPickUpRequest {
    delivery: "самовывоз";
    client: number;
    cart: number;
    cart_id: number;
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_phone_number: string;
    text: string;
}

interface IFormTelegram {
    id: number;
    client: number;
    delivery: string;
    cart: {
        items: CartItem;
        total_price: string;
    };
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_phone_number: string;
    text: string;
    created_at: string;
}

interface ValidationErrorResponse {
    cart?: string[];
    cart_id?: string[];
    client_phone_number?: string[];
    status?: number;
    [key: string]: string[] | number | undefined;
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

    const [validationError, setValidationError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<OrderFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        comments: "",
        receipt: undefined,
    });

    const uniqueCartItems = useMemo(() => {
        const seen = new Map<string, number>();
        const uniqueItems: CartItem[] = [];

        cartData.forEach((item) => {
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "phone") {
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
    }) => {
        try {
            // Очищаем текст от специальных символов
            const sanitizeText = (text: string) => {
                return text.trim().replace(/[<>]/g, "");
            };

            // Форматируем сообщение для Telegram используя markdown
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

            // Отправляем запрос в Telegram
            await axios.post(
                `https://api.telegram.org/bot${TOKEN}/sendMessage`,
                {
                    chat_id: CHAT_ID,
                    parse_mode: "MarkdownV2", // Используем MarkdownV2 вместо HTML
                    text: messageTG.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&"), // Экранируем специальные символы
                }
            );

            console.log("✅ Уведомление успешно отправлено в Telegram");
        } catch (error) {
            console.error("❌ Ошибка отправки в Telegram:", error);
            if (axios.isAxiosError(error)) {
                console.error("Детали ошибки:", error.response?.data);
            }
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

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Пожалуйста, введите корректный email адрес");
            }

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

            // Check delivery list using RTK Query data
            const deliveryListExists = !!deliveryList;
            if (deliveryError) {
                console.warn(
                    "Ошибка при получении списка доставок:",
                    deliveryError
                );
            }

            // Сохраняем все ID товаров для последующего удаления
            const itemsToDelete = uniqueCartItems.map((item) => item.id);

            for (const item of uniqueCartItems) {
                if (!meData?.id) {
                    throw new Error("Пользователь не авторизован");
                }

                const orderData = {
                    client: Number(meData.id),
                    cart: Number(meData.id),
                    cart_id: Number(meData.id),
                    client_first_name: formData.firstName.trim(),
                    client_last_name: formData.lastName.trim(),
                    client_email: formData.email.trim(),
                    client_phone_number: formData.phone,
                    text: formData.comments.trim(),
                    client_address:
                        activeButton === "delivery"
                            ? formData.address?.trim() || "Адрес не указан"
                            : "Самовывоз",
                };

                try {
                    // Отправляем заказ на бэкенд
                    if (activeButton === "delivery") {
                        await postRegDelivery({
                            ...orderData,
                            delivery: "доставка",
                        }).unwrap();
                    } else {
                        await postRegPickUp({
                            ...orderData,
                            delivery: "самовывоз",
                        }).unwrap();
                    }

                    // Отправляем уведомление в Telegram
                    await sendToTelegram({
                        ...orderData,
                        delivery:
                            activeButton === "delivery"
                                ? "доставка"
                                : "самовывоз",
                        created_at: new Date().toISOString(),
                        total_price: calculateTotal(),
                        total_items: calculateTotalQuantity(),
                    });
                } catch (error) {
                    console.error("🚨 Ошибка оформления заказа:", error);
                    handleOrderError(error);
                    throw error;
                }
            }

            // После успешного оформления заказа:

            // 1. Очищаем корзину
            for (const itemId of itemsToDelete) {
                try {
                    await deleteCartItem(itemId).unwrap();
                } catch (error) {
                    console.error("Ошибка при очистке корзины:", error);
                }
            }

            // 2. Очищаем форму
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                comments: "",
                receipt: undefined,
            });

            // 3. Сбрасываем файл чека
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
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleOrderError = (error: unknown) => {
        if (error instanceof Error) {
            setValidationError(error.message);
        } else if (typeof error === "object" && error !== null) {
            const apiError = error as ValidationErrorResponse;

            if (apiError.status === 400) {
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
    };

    if (isLoading) {
        return <div>Loading...</div>;
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
