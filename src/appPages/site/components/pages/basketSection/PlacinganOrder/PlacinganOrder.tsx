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

// Types
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
}

// Base interface for common order data
interface CommonOrderData {
    client: number | null; // Changed from undefined to null
    cart: number;
    cart_id: number;
    client_first_name: string;
    client_last_name: string;
    client_email: string;
    client_phone_number: string;
    client_address?: string; // Made required in base interface
    text: string;
}

interface DeliveryOrderData extends CommonOrderData {
    delivery: "доставка";
}

// Pickup specific interface
interface PickupOrderData extends CommonOrderData {
    delivery: "самовывоз";
}
interface ApiError {
    status?: number;
    data?: {
        message?: string;
    };
}

const PlacinganOrder = () => {
    // Queries and Mutations
    const { data: cartData = [], isLoading } = useGetCartItemsQuery();
    const [deleteCartItem] = useDeleteCartMutation();
    const [postRegDelivery] = usePostRegDeliveryMutation();
    const { data: meData } = useGetMeQuery();
    const [postRegPickUp] = usePostRegPickUpMutation();
    const [updateQuantity] = useUpdateQuantityMutation();

    // State
    const [activeButton, setActiveButton] = useState<"delivery" | "pickup">(
        "delivery"
    );
    const [validationError, setValidationError] = useState<string>("");
    const [formData, setFormData] = useState<OrderFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        comments: "",
    });

    // Memoized cart items with deduplication
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
                uniqueItems.push({ ...item });
            }
        });

        return uniqueItems;
    }, [cartData, deleteCartItem]);

    // Utility functions
    const formatPhoneNumber = (phone: string): string => {
        const cleaned = phone.replace(/\D/g, "");
        return !cleaned.startsWith("996") ? `+996${cleaned}` : `+${cleaned}`;
    };

    const validatePhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^\+996\d{9}$/;
        return phoneRegex.test(formatPhoneNumber(phone));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (name === "phone") {
            const sanitizedValue = value.replace(/[^\d+\s()-]/g, "");
            setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
        } else if (type === "file" && files) {
            setFormData((prev) => ({ ...prev, receipt: files[0] }));
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

        try {
            // Validate cart is not empty
            if (uniqueCartItems.length === 0) {
                throw new Error("Корзина пуста!");
            }

            // Validate form fields first
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

            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join(", "));
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Пожалуйста, введите корректный email адрес");
            }

            // Format and validate phone number
            let formattedPhone = formData.phone;
            if (!formattedPhone.startsWith("+996")) {
                formattedPhone = `+996${formattedPhone.replace(/\D/g, "")}`;
            }

            // Validate phone number format
            const phoneRegex = /^\+996\d{9}$/;
            if (!phoneRegex.test(formattedPhone)) {
                throw new Error(
                    "Пожалуйста, введите действительный номер телефона в формате +996XXXXXXXXX"
                );
            }

            // Process each cart item
            for (const item of uniqueCartItems) {
                const commonOrderData = {
                    client: meData?.id ? Number(meData.id) : 0,
                    cart: Number(item.id),
                    cart_id: Number(item.id),
                    client_first_name: formData.firstName.trim(),
                    client_last_name: formData.lastName.trim(),
                    client_email: formData.email.trim(),
                    client_phone_number: formattedPhone,
                    text: formData.comments.trim(),
                };

                try {
                    if (activeButton === "delivery") {
                        const deliveryData = {
                            ...commonOrderData,
                            delivery: "доставка",
                            client_address: formData.address?.trim() || "",
                        };

                        console.log("Sending delivery order:", deliveryData);
                        const response = await postRegDelivery(
                            deliveryData
                        ).unwrap();
                        console.log("Delivery response:", response);
                    } else {
                        const pickupData = {
                            ...commonOrderData,
                            delivery: "самовывоз",
                        };

                        console.log("Sending pickup order:", pickupData);
                        const response = await postRegPickUp(
                            pickupData
                        ).unwrap();
                        console.log("Pickup response:", response);
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("API Error:", error.message);
                        throw new Error(error.message);
                    } else if (
                        typeof error === "object" &&
                        error !== null &&
                        "status" in error
                    ) {
                        const apiError = error as {
                            status: number;
                            data?: { message?: string };
                        };

                        console.error("API Error:", apiError);

                        if (apiError.data?.message) {
                            throw new Error(apiError.data.message);
                        } else if (apiError.status === 500) {
                            throw new Error(
                                "Ошибка сервера. Пожалуйста, попробуйте позже."
                            );
                        } else {
                            throw new Error(
                                "Ошибка при оформлении заказа. Пожалуйста, проверьте данные и попробуйте снова."
                            );
                        }
                    } else {
                        throw new Error(
                            "Произошла неизвестная ошибка при оформлении заказа."
                        );
                    }
                }
            }

            // Success handling
            alert(
                `Заказ успешно оформлен! Тип: ${
                    activeButton === "delivery" ? "Доставка" : "Самовывоз"
                }`
            );
            setValidationError("");
        } catch (error) {
            console.error("Order submission error:", error);
            if (error instanceof Error) {
                setValidationError(error.message);
            } else {
                setValidationError(
                    "Произошла неизвестная ошибка при оформлении заказа."
                );
            }
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
                                        type="tel"
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
