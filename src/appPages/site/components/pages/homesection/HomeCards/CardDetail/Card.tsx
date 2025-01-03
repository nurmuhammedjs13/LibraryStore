"use client";
import scss from "./Card.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetBooksDetailQuery } from "@/redux/api/books";
import star from "@/assets/Icons/star.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import star0 from "@/assets/Icons/star0.png";
import activeStar from "@/assets/Icons/activeStar.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import back from "@/assets/Icons/Back.png";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import CardComments from "./CardDetailSection/CardComments/CardComments";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

interface BookDetail {
    id: number;
    book_name: string;
    author: string;
    price: number;
    average_rating: number;
    total_ratings: number;
    book_images: Array<{ book_images: string }>;
    janre: Array<{ janre_name: string }>;
    description?: string;
}

const CardDetail = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };
    const { id } = useParams();
    const bookId = typeof id === "string" ? parseInt(id, 10) : undefined;

    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [userRating, setUserRating] = useState<number>(0);

    const { data, isLoading, isError } = useGetBooksDetailQuery(bookId ?? -1);

    if (isLoading) {
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    }

    if (!data) {
        return <div>No data available.</div>;
    }

    console.log(data);
    if (isError) {
        return (
            <div className={scss.loaderBlock}>
                <div>Ошибка загрузки данных. Попробуйте позже.</div>
            </div>
        );
    }

    const toggleLike = (id: number) => {
        setLikedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <section className={scss.CardDetail}>
                <div className="container">
                    <div className={scss.content}>
                        <Image
                            onClick={() => router.push(`/`)}
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
                                        data.book_images?.[0]?.book_images ||
                                        defaultBook
                                    }
                                    alt={`Book cover for ${data.book_name}`}
                                    className={scss.cardImg}
                                    width={1000}
                                    height={1200}
                                    priority
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.bookNameBlock}>
                                        <h1 className={scss.bookName}>
                                            {data.book_name}
                                        </h1>
                                        <h2 className={scss.authorName}>
                                            {data.author}
                                        </h2>
                                    </div>
                                    <div className={scss.bookGenreBlock}>
                                        {data.janre?.map((genre, index) => (
                                            <p
                                                key={`${genre.janre_name}-${index}`}
                                                className={scss.genreBlock}
                                            >
                                                Жанр: {genre.janre_name}
                                            </p>
                                        ))}
                                    </div>
                                    <Image
                                        width={150}
                                        height={30}
                                        src={
                                            STAR_RATINGS[
                                                Math.floor(data.average_rating)
                                            ] || star0
                                        }
                                        className={scss.ratingStars}
                                        alt={`Rating: ${data.average_rating} stars`}
                                    />
                                    <button className={scss.bookPriceBlock}>
                                        <Image
                                            className={scss.priceIcon}
                                            src={priceIcon}
                                            alt="Price icon"
                                            width={100}
                                            height={100}
                                        />
                                        {data.price} сом
                                    </button>
                                    <div className={scss.bookActAndDesBlock}>
                                        <h1 className={scss.description}>
                                            {data.description}
                                        </h1>
                                        <div className={scss.actions}>
                                            <button
                                                onClick={handleAddToCart}
                                                className={scss.cardButton}
                                                aria-label="Add to cart"
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
                                                    toggleLike(data.id)
                                                }
                                                aria-label={
                                                    likedItems.includes(data.id)
                                                        ? "Remove from favorites"
                                                        : "Add to favorites"
                                                }
                                            >
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    src={
                                                        likedItems.includes(
                                                            data.id
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
                        <div className={scss.rating}>
                            <div className={scss.hr} />
                            <div className={scss.ratingContent}>
                                <div className={scss.toRating}>
                                    <h2 className={scss.toRatingText}>
                                        Оценить:
                                        <div className={scss.stars}>
                                            {[1, 2, 3, 4, 5].map(
                                                (starNumber) => (
                                                    <button
                                                        key={starNumber}
                                                        className={
                                                            scss.starButton
                                                        }
                                                        onClick={() =>
                                                            setUserRating(
                                                                starNumber
                                                            )
                                                        }
                                                        aria-label={`Rate ${starNumber} stars`}
                                                    >
                                                        <Image
                                                            width={100}
                                                            height={100}
                                                            className={
                                                                scss.starIcon
                                                            }
                                                            src={
                                                                starNumber <=
                                                                userRating
                                                                    ? activeStar
                                                                    : star
                                                            }
                                                            alt={`${starNumber} stars`}
                                                        />
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </h2>
                                </div>
                                <p className={scss.ratingUsers}>
                                    Оценок: {data.total_ratings}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <DetailCards />
            <CardComments />
        </>
    );
};

export default CardDetail;
