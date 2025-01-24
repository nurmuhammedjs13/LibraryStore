"use client";

import scss from "./Card.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetDiscountQuery } from "@/redux/api/discountSlider";
import star0 from "@/assets/Icons/star0.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import back from "@/assets/Icons/Back.png";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

const CardDetail = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const { id } = useParams();

    const { data, isLoading, isError } = useGetDiscountQuery();

    const handleAddToCart = () => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
    };

    const toggleLike = (bookId: number) => {
        setLikedItems((prev) =>
            prev.includes(bookId)
                ? prev.filter((item) => item !== bookId)
                : [...prev, bookId]
        );
    };

    if (isLoading) {
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={scss.loaderBlock}>
                <div>Ошибка загрузки данных. Попробуйте позже.</div>
            </div>
        );
    }

    if (!data || !data[0]?.books) {
        return <div>Данные не найдены.</div>;
    }

    const book = data.find((data) => data.id.toString() === id);

    console.log(JSON.stringify(book, null, 2));
    if (!book) {
        return <div>Книга не найдена.</div>;
    }

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
                                    <Image
                                        width={150}
                                        height={30}
                                        src={
                                            STAR_RATINGS[
                                                Math.floor(
                                                    book.books.average_rating
                                                )
                                            ] || star0
                                        }
                                        alt={`Rating: ${book.books.average_rating} stars`}
                                    />
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
                                                onClick={handleAddToCart}
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
                                            <button
                                                className={scss.buttonLike}
                                                onClick={() =>
                                                    toggleLike(book.id)
                                                }
                                            >
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    src={
                                                        likedItems.includes(
                                                            book.id
                                                        )
                                                            ? likeActive
                                                            : like
                                                    }
                                                    alt="Toggle favorite"
                                                />
                                            </button>
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
