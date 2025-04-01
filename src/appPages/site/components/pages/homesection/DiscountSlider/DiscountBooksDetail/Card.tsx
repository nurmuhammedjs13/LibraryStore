"use client";

import scss from "./Card.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
    useGetDiscountDetailQuery,
    useGetDiscountQuery,
} from "@/redux/api/discountSlider";
import star0 from "@/assets/Icons/star0.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import back from "@/assets/Icons/Back.png";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import { useGetMeQuery } from "@/redux/api/auth";
import {
    useAddToCartMutation,
    useDeleteCartMutation,
    useGetCartItemsQuery,
} from "@/redux/api/addToCart";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

interface ErrorWithStatus {
    status?: number;
    data?: {
        detail?: string;
    };
}

const CardDetail = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
    const userId = meData?.id || null;
    const { data: cartData = [], refetch: refetchCart } =
        useGetCartItemsQuery();
    const [addToCartMutation] = useAddToCartMutation();
    const [deleteCartItem] = useDeleteCartMutation();

    const {
        data: book,
        isLoading,
        isError,
    } = useGetDiscountDetailQuery(Number(id));

    if (isLoading) {
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    }

    const handleToggleCart = async () => {
        if (!userId) {
            alert(
                "Пожалуйста, авторизуйтесь, чтобы добавлять книги в корзину."
            );
            return;
        }

        try {
            if (!book) {
                throw new Error("Книга не найдена");
            }

            const existingCartItem = cartData.find(
                (item) => item.books.id === book.books.id
            );

            if (existingCartItem) {
                await deleteCartItem(existingCartItem.id).unwrap();
                alert("Книга удалена из корзины");
            } else {
                const requestBody = {
                    books_id: book.books.id,
                    books: {
                        book_name: book.books.book_name,
                        price: book.books.price,
                    },
                    quantity: 1,
                };

                await addToCartMutation(requestBody).unwrap();
                setShowModal(true);
                setTimeout(() => setShowModal(false), 2000);
            }

            refetchCart();
        } catch (error: unknown) {
            console.error("Ошибка работы с корзиной:", error);

            const typedError = error as ErrorWithStatus;

            if (typedError.status === 404) {
                alert(
                    `Не удалось найти элемент корзины: ${
                        typedError.data?.detail || "Неизвестная ошибка"
                    }`
                );
            } else if (typedError instanceof Error) {
                alert(typedError.message);
            } else {
                alert("Произошла неизвестная ошибка при работе с корзиной.");
            }
        }
    };
    if (isError) {
        return (
            <div className={scss.loaderBlock}>
                <div>Ошибка загрузки данных. Попробуйте позже.</div>
            </div>
        );
    }

    if (!book) {
        return <div>Данные не найдены.</div>;
    }

    console.log(book);

    return (
        <>
            <section className={scss.CardDetail}>
                <div className="container">
                    <div className={scss.content}>
                        <Image
                            onClick={() => router.push("/")}
                            className={scss.backButton}
                            src={back}
                            alt="Back to home"
                            width={100}
                            height={100}
                            priority
                        />
                        <div className={scss.detailContent}>
                            <div className={scss.bookContent}>
                                <Image
                                    src={
                                        book.books.book_images[0].book_images ||
                                        defaultBook
                                    }
                                    alt={`Book cover for ${book.books.book_name}`}
                                    className={scss.cardImg}
                                    width={1000}
                                    height={1200}
                                    priority
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.bookNameBlock}>
                                        <h1 className={scss.bookName}>
                                            {book.books.book_name}
                                        </h1>
                                        <h2 className={scss.authorName}>
                                            {book.books.author}
                                        </h2>
                                    </div>
                                    <div className={scss.bookGenreBlock}>
                                        {book.books.janre?.map(
                                            (genre, index: number) => (
                                                <p
                                                    key={`${genre.janre_name}-${index}`}
                                                    className={scss.genreBlock}
                                                >
                                                    Жанр: {genre.janre_name}
                                                </p>
                                            )
                                        )}
                                    </div>

                                    <button className={scss.bookPriceBlock}>
                                        <Image
                                            className={scss.priceIcon}
                                            src={priceIcon}
                                            alt="Price icon"
                                            width={100}
                                            height={100}
                                        />
                                        {book.discount_book} сом
                                        <div className={scss.discount}>
                                            Скидка: {book.discount}
                                        </div>
                                    </button>
                                    <div className={scss.bookActAndDesBlock}>
                                        <h1 className={scss.description}>
                                            {book.description ||
                                                book.books?.description ||
                                                "Описание отсутствует"}
                                        </h1>
                                        <div className={scss.actions}>
                                            <button
                                                onClick={handleToggleCart}
                                                className={scss.cardButton}
                                            >
                                                В корзину
                                            </button>
                                            {showModal && (
                                                <div className={scss.modal}>
                                                    <p>
                                                        Товар добавлен в
                                                        корзину✓
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <DetailCards />
        </>
    );
};

export default CardDetail;
