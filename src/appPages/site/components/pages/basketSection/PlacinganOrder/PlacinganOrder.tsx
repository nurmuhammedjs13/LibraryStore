"use client";
import React, {
    useState,
    useMemo,
    ChangeEvent,
    FormEvent,
    useEffect,
} from "react";
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
    useAddToCartMutation,
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

const PlacinganOrder = () => {
    const { data: cartData = [], isLoading } = useGetCartItemsQuery();
    const [deleteCartItem] = useDeleteCartMutation();
    const [postRegDelivery] = usePostRegDeliveryMutation();
    const { data: meData } = useGetMeQuery();
    const [itemOrder, setItemOrder] = useState<number[]>([]);
    const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
    const [isLocalStateInitialized, setIsLocalStateInitialized] =
        useState(false);
    const [addToCart] = useAddToCartMutation();

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

    useEffect(() => {
        const duplicateItems = cartData.filter(
            (item, index, self) =>
                self.findIndex((i) => i.books.id === item.books.id) !== index
        );
        duplicateItems.forEach(async (item) => {
            if (item.id) {
                await deleteCartItem(item.id).unwrap();
            }
        });
    }, [cartData, deleteCartItem]);

    const handleDelete = async (id: number) => {
        try {
            await deleteCartItem(id).unwrap();
        } catch (error) {
            console.error("Error deleting item:", error);
            setValidationError("Ошибка при удалении товара");
        }
    };

    //////// +/-

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    // Обновленная функция handleQuantityChange с правильной типизацией
    const handleQuantityChange = async (
        id: number,
        currentQuantity: number,
        increment: boolean
    ) => {
        const newQuantity = increment
            ? currentQuantity + 1
            : Math.max(1, currentQuantity - 1);

        // Ищем товар в списке
        const itemIndex = uniqueCartItems.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            console.error("Товар не найден");
            return;
        }

        // Сохраняем ID книги для последующего использования
        const bookId = uniqueCartItems[itemIndex].books.id;

        // Сохраняем порядок элементов, если он еще не сохранен
        if (!itemOrder.includes(bookId)) {
            // Создаем новый массив порядка, включающий все текущие ID книг в порядке их отображения
            const newOrder = uniqueCartItems.map((item) => item.books.id);
            setItemOrder(newOrder);
        }

        // Запоминаем позицию прокрутки с правильной типизацией
        const itemElement = document.querySelector(
            `[data-book-id="${bookId}"]`
        );
        const scrollContainer =
            (itemElement?.closest(
                ".cart-items-container"
            ) as HTMLElement | null) || window;

        const scrollPosition =
            scrollContainer === window
                ? window.scrollY
                : (scrollContainer as HTMLElement).scrollTop;

        try {
            const itemToUpdate = { ...uniqueCartItems[itemIndex] };

            setIsUpdating(true);

            await deleteCartItem(id).unwrap();

            await addToCart({
                books: {
                    book_name: itemToUpdate.books.book_name,
                    author: itemToUpdate.books.author,
                    price: itemToUpdate.books.price,
                },
                quantity: newQuantity,
                books_id: itemToUpdate.books.id,
            }).unwrap();

            setTimeout(() => {
                if (scrollContainer === window) {
                    window.scrollTo({ top: scrollPosition });
                } else {
                    (scrollContainer as HTMLElement).scrollTop = scrollPosition;
                }
                setIsUpdating(false);
            }, 200);
        } catch (error) {
            console.error("Ошибка при обновлении количества:", error);
            setValidationError("Ошибка при обновлении количества");
            setIsUpdating(false);
        }
    };

    //////// +/-

    const calculateTotalQuantity = () => {
        return uniqueCartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const calculateTotal = () => {
        return uniqueCartItems.reduce(
            (sum, item) => sum + item.books.price * item.quantity,
            0
        );
    };

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            comments: "",
            receipt: undefined,
        });

        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };
    const clearCartItems = async () => {
        try {
            if (meData?.id) {
                for (const item of uniqueCartItems) {
                    if (item && item.id) {
                        try {
                            await deleteCartItem(item.id).unwrap();
                        } catch (error) {
                            if (
                                typeof error === "object" &&
                                error !== null &&
                                "status" in error &&
                                error.status === 404
                            ) {
                                console.warn(
                                    `Товар с id ${item.id} уже удалён.`
                                );
                            } else {
                                throw error;
                            }
                        }
                    }
                }
            } else {
                console.log(
                    "Пользователь не авторизован, корзина не может быть очищена"
                );
            }
        } catch (error) {
            console.error("Ошибка при очистке корзины:", error);
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
        setValidationError("");

        try {
            if (uniqueCartItems.length === 0) {
                throw new Error("Корзина пуста!");
            }

            if (
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.phone
            ) {
                throw new Error("Пожалуйста, заполните все обязательные поля");
            }

            if (activeButton === "delivery" && !formData.address) {
                throw new Error("Адрес доставки обязателен");
            }

            if (!formData.receipt) {
                throw new Error("Чек оплаты обязателен");
            }

            if (!meData?.id) {
                throw new Error("Пользователь не авторизован");
            }

            const commonFormData = new FormData();

            commonFormData.append("client", String(Number(meData.id)));
            commonFormData.append("cart_id", String(Number(meData.id)));

            commonFormData.append(
                "client_first_name",
                formData.firstName.trim()
            );
            commonFormData.append("client_last_name", formData.lastName.trim());
            commonFormData.append("client_email", formData.email.trim());
            commonFormData.append("client_phone_number", formData.phone);

            if (formData.comments) {
                commonFormData.append("text", formData.comments.trim());
            }

            if (formData.receipt instanceof File) {
                commonFormData.append("check_order", formData.receipt);
            }

            let response;
            if (activeButton === "delivery") {
                commonFormData.append("delivery", "доставка");

                if (formData.address) {
                    commonFormData.append(
                        "client_address",
                        formData.address.trim()
                    );
                }

                console.log(
                    "Отправляем данные для доставки:",
                    Object.fromEntries(commonFormData)
                );

                response = await postRegDelivery(commonFormData).unwrap();
                console.log("Успешный ответ (доставка):", response);

                await sendToTelegram({
                    client_first_name: formData.firstName,
                    client_last_name: formData.lastName,
                    client_email: formData.email,
                    client_phone_number: formData.phone,
                    delivery: "доставка",
                    created_at: new Date().toISOString(),
                    text: formData.comments,
                    client_address: formData.address,
                    total_price: calculateTotal(),
                    total_items: calculateTotalQuantity(),
                    receipt: formData.receipt,
                });

                await clearCartItems();
                resetForm();

                alert("Заказ с доставкой успешно оформлен!");
            } else {
                const pickupFormData = new FormData();

                for (const [key, value] of commonFormData.entries()) {
                    pickupFormData.append(key, value);
                }

                pickupFormData.append("delivery", "самовывоз");

                pickupFormData.append("cart", String(Number(meData.id)));

                console.log(
                    "Отправляем данные для самовывоза:",
                    Object.fromEntries(pickupFormData)
                );

                try {
                    response = await postRegPickUp(pickupFormData).unwrap();
                    console.log("Успешный ответ (самовывоз):", response);

                    await sendToTelegram({
                        client_first_name: formData.firstName,
                        client_last_name: formData.lastName,
                        client_email: formData.email,
                        client_phone_number: formData.phone,
                        delivery: "самовывоз",
                        created_at: new Date().toISOString(),
                        text: formData.comments,
                        total_price: calculateTotal(),
                        total_items: calculateTotalQuantity(),
                        receipt: formData.receipt,
                    });

                    await clearCartItems();
                    resetForm();

                    alert("Заказ с самовывозом успешно оформлен!");
                } catch (pickupError) {
                    console.error(
                        "Детальная ошибка при оформлении самовывоза:",
                        pickupError
                    );

                    console.log(
                        "Пробуем фиксированный формат для API самовывоза..."
                    );

                    const pickupData = {
                        client: Number(meData.id),
                        cart_id: Number(meData.id),
                        cart: Number(meData.id),
                        client_first_name: formData.firstName.trim(),
                        client_last_name: formData.lastName.trim(),
                        client_email: formData.email.trim(),
                        client_phone_number: formData.phone,
                        delivery: "самовывоз",
                        text: formData.comments || "",
                    };

                    console.log(
                        "Пробуем отправить JSON для самовывоза:",
                        pickupData
                    );

                    try {
                        const rawResponse = await fetch(
                            "https://www.apibackendokukg.space/create_pickup/",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(pickupData),
                            }
                        );

                        if (rawResponse.ok) {
                            const jsonResponse = await rawResponse.json();
                            console.log("JSON запрос успешен:", jsonResponse);

                            await sendToTelegram({
                                client_first_name: formData.firstName,
                                client_last_name: formData.lastName,
                                client_email: formData.email,
                                client_phone_number: formData.phone,
                                delivery: "самовывоз",
                                created_at: new Date().toISOString(),
                                text: formData.comments,
                                total_price: calculateTotal(),
                                total_items: calculateTotalQuantity(),
                                receipt: formData.receipt,
                            });

                            resetForm();

                            alert("Заказ с самовывозом успешно оформлен!");
                        } else {
                            console.error(
                                "Ошибка при отправке JSON:",
                                await rawResponse.text()
                            );
                            throw new Error(
                                `Ошибка при отправке JSON: ${rawResponse.status}`
                            );
                        }
                    } catch (jsonError) {
                        console.error(
                            "Ошибка при использовании JSON:",
                            jsonError
                        );
                        setValidationError(
                            "Не удалось оформить заказ с самовывозом. Пожалуйста, свяжитесь с администратором."
                        );
                    }
                }
            }
        } catch (error) {
            console.error("🚨 Ошибка оформления заказа:", error);

            if (error instanceof Error) {
                setValidationError(error.message);
            } else if (typeof error === "object" && error !== null) {
                setValidationError(
                    "Произошла ошибка при оформлении заказа. Проверьте правильность введенных данных."
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (uniqueCartItems.length > 0 && !isLocalStateInitialized) {
            setLocalCartItems(uniqueCartItems);
            setIsLocalStateInitialized(true);
        }
    }, [uniqueCartItems, isLocalStateInitialized]);

    // Отображайте элементы с учетом сохраненного порядка
    const sortedCartItems = useMemo(() => {
        if (itemOrder.length === 0) return uniqueCartItems;

        const itemsMap = new Map(
            uniqueCartItems.map((item) => [item.books.id, item])
        );
        return itemOrder
            .map((id) => itemsMap.get(id))
            .filter(Boolean) as CartItem[];
    }, [uniqueCartItems, itemOrder]);
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
                            <div
                                className={styles.cardBlock}
                                key={`book-${item.books.id}`}
                                data-book-id={item.books.id}
                            >
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
