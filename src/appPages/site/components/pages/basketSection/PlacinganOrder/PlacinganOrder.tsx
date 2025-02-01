"use client";
import React, { useState, useMemo } from "react";
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

interface OrderFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    comments: string;
    receipt?: File;
}

type CartItem = {
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
};

const PlacinganOrder = () => {
    const { data: cartData = [], isLoading } = useGetCartItemsQuery();
    const [deleteCartItem] = useDeleteCartMutation();
    const [postRegDelivery] = usePostRegDeliveryMutation();
    const [postRegPickUp] = usePostRegPickUpMutation();
    const [updateQuantity] = useUpdateQuantityMutation();
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

    const formatPhoneNumber = (phone: string): string => {
        const cleaned = phone.replace(/\D/g, "");

        if (!cleaned.startsWith("996")) {
            return `+996${cleaned}`;
        }
        return `+${cleaned}`;
    };

    const validatePhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^\+996\d{9}$/;
        return phoneRegex.test(formatPhoneNumber(phone));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (name === "phone") {
            const sanitizedValue = value.replace(/[^\d+\s()-]/g, "");
            setFormData((prev) => ({
                ...prev,
                [name]: sanitizedValue,
            }));
        } else if (type === "file" && files) {
            setFormData((prev) => ({
                ...prev,
                receipt: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        setValidationError("");
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCartItem(id).unwrap();
        } catch (error) {
            console.error("Error deleting item:", error);
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

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (uniqueCartItems.length === 0) {
            setValidationError("Корзина пуста!");
            return;
        }

        const formattedPhone = formatPhoneNumber(formData.phone);
        if (!validatePhoneNumber(formattedPhone)) {
            setValidationError(
                "Пожалуйста, введите действительный номер телефона в формате +996XXXXXXXXX"
            );
            return;
        }
        try {
            for (const item of uniqueCartItems) {
                const commonData = {
                    client: 1,
                    cart_item: item.id,
                    client_first_name: formData.firstName,
                    client_last_name: formData.lastName,
                    client_email: formData.email,
                    client_phone_number: formattedPhone,
                    text: formData.comments,
                };

                let response;
                if (activeButton === "delivery") {
                    const deliveryData = {
                        ...commonData,
                        delivery: "доставка",
                        client_address: formData.address || "",
                    };
                    console.log(
                        "Sending delivery request with data:",
                        deliveryData
                    );
                    response = await postRegDelivery(deliveryData).unwrap();
                    console.log(
                        "Delivery order registration successful:",
                        response
                    );
                } else {
                    const pickupData = {
                        ...commonData,
                        delivery: "самовывоз",
                    };
                    console.log(
                        "Sending pickup request with data:",
                        pickupData
                    );
                    response = await postRegPickUp(pickupData).unwrap();
                    console.log(
                        "Pickup order registration successful:",
                        response
                    );
                }
            }

            alert(
                `Заказ успешно оформлен! Тип: ${
                    activeButton === "delivery" ? "Доставка" : "Самовывоз"
                }`
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                comments: "",
            });
        } catch (error: unknown) {
            console.error("Order submission error:", error);
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
