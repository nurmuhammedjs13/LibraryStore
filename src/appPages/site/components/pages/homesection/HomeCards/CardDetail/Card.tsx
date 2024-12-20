"use client";

import scss from "./Card.module.scss";
import React, { useState } from "react";
import Image from "next/image";
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
import imgs from "@/assets/image 19.png";
import back from "@/assets/Icons/Back.png";
import { useRouter } from "next/navigation";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import CardComments from "./CardDetailSection/CardComments/CardComments";

const CardDetail = () => {
    const router = useRouter();
    const stars = [star0, star1, star2, star3, star4, star5];
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [userRating, setUserRating] = useState<number>(0);
    const toggleLike = (id: number) => {
        setLikedItems((prevLikedItems) => {
            const index = prevLikedItems.indexOf(id);
            if (index === -1) {
                return [...prevLikedItems, id];
            } else {
                const newLikedItems = [...prevLikedItems];
                newLikedItems.splice(index, 1);
                return newLikedItems;
            }
        });
    };

    const handleStarClick = (rating: number) => {
        setUserRating(rating);
    };

    const data = {
        id: 1,
        books: {
            id: 1,
            book_images: [
                {
                    book_images: imgs,
                },
            ],
            book_name: "Гордость . . .",
            author: "Джейн Остин",
            price: 1700,
            average_rating: 3.5,
            total_ratings: 5,
            janre: [
                {
                    janre_name: "Романтика",
                },
            ],
            description:
                "История о любви и социальных барьерах в Англии XIX века. Главная героиня, Элизабет Беннет, преодолевает свои предвзятые суждения о мистере Дарси, чтобы найти настоящую любовь.",
            ratings: [
                {
                    id: 8,
                    user_rating: {
                        first_name: "",
                        last_name: "",
                    },
                    book: 1,
                    aksia_books: null,
                    katalog_books: null,
                    katalog_aksia_books: null,
                    stars: 1,
                    comment: "kmmo",
                    created_date: "15-12-2024-16:04",
                },
            ],
        },
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
                            alt="button of back"
                            width={100}
                            height={100}
                        />
                        <div className={scss.detailContent}>
                            <div className={scss.bookContent}>
                                <Image
                                    src={data.books.book_images[0].book_images}
                                    alt="img of book"
                                    className={scss.cardImg}
                                    width={1000}
                                    height={1200}
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.bookNameBlock}>
                                        <h1 className={scss.bookName}>
                                            {data.books.book_name}
                                        </h1>
                                        <h1 className={scss.authorName}>
                                            {data.books.author}
                                        </h1>
                                    </div>
                                    <div className={scss.bookGenreBlock}>
                                        {data.books.janre.map(
                                            (genre, index) => (
                                                <h1
                                                    key={index}
                                                    className={scss.genreBlock}
                                                >
                                                    Жанр: {genre.janre_name}
                                                </h1>
                                            )
                                        )}
                                    </div>
                                    <Image
                                        width={150}
                                        height={30}
                                        src={
                                            stars[
                                                Math.floor(
                                                    data.books.average_rating
                                                )
                                            ]
                                        }
                                        alt={`Рейтинг ${data.books.average_rating}`}
                                    />
                                    <button className={scss.bookPriceBlock}>
                                        <Image
                                            className={scss.priceIcon}
                                            src={priceIcon}
                                            alt="icon of price"
                                            width={100}
                                            height={100}
                                        />
                                        {data.books.price} сом
                                    </button>
                                    <div className={scss.bookActAndDesBlock}>
                                        <h1 className={scss.description}>
                                            {data.books.description}
                                        </h1>
                                        <div className={scss.actions}>
                                            <button className={scss.cardButton}>
                                                В корзину
                                            </button>
                                            <button
                                                className={scss.buttonLike}
                                                onClick={() =>
                                                    toggleLike(data.id)
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
                                                    alt="add to like"
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
                                    <h1 className={scss.toRatingText}>
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
                                                            handleStarClick(
                                                                starNumber
                                                            )
                                                        }
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
                                                            alt={`Оценить на ${starNumber}`}
                                                        />
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </h1>
                                </div>
                                <h1 className={scss.ratingUsers}>
                                    Оценок: {data.books.total_ratings}
                                </h1>
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
