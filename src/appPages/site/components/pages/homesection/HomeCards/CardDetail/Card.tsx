"use client";

import React, { useState } from "react";
import scss from "./Card.module.scss";
import priceIcon from "../../../../../../../assets/Icons/HomePrice.png";
import star0 from "../../../../../../../assets/Icons/star0.png"; // Серые звезды
import star1 from "../../../../../../../assets/Icons/star1.png";
import star2 from "../../../../../../../assets/Icons/star2.png";
import star3 from "../../../../../../../assets/Icons/star3.png";
import star4 from "../../../../../../../assets/Icons/star4.png";
import star5 from "../../../../../../../assets/Icons/star5.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import img from "../../../../../../../assets/image 19.png";
import back from "../../../../../../../assets/Icons/Back.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import CardComments from "./CardDetailSection/CardComments/CardComments";

const CardDetail = () => {
    const router = useRouter();

    const stars = [star0, star1, star2, star3, star4, star5]; // Массив всех звезд
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [currentRating, setCurrentRating] = useState(0); // Хранение текущего рейтинга
    const [userRating, setUserRating] = useState<number | null>(null); // Для хранения рейтинга пользователя

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
        setUserRating(rating); // Обновляем рейтинг пользователя
        setCurrentRating(rating); // Обновляем текущий рейтинг
    };

    const data = {
        id: 1,
        books: {
            id: 1,
            book_images: [
                {
                    book_images: img,
                },
            ],
            book_name: "Гордость . . .",
            author: "Джейн Остин",
            price: 1700,
            average_rating: 3.5, // средний рейтинг
            total_ratings: 5, // общее количество рейтингов
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
                            width={100}
                            height={100}
                            className={scss.backButton}
                            src={back}
                            alt="button of back"
                        />
                        <div className={scss.detailContent}>
                            <div className={scss.bookContent}>
                                <Image
                                    width={1000}
                                    height={1200}
                                    src={data.books.book_images[0].book_images}
                                    alt="img of book"
                                    className={scss.cardImg}
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
                                        width={110}
                                        src={
                                            stars[
                                                Math.floor(
                                                    data.books.average_rating
                                                )
                                            ]
                                        } // Показываем текущий средний рейтинг
                                        alt={`Рейтинг ${data.books.average_rating}`}
                                    />
                                    <button className={scss.bookPriceBlock}>
                                        <Image
                                            className={scss.priceIcon}
                                            width={100}
                                            height={100}
                                            src={priceIcon}
                                            alt="icon of price"
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
                                    </h1>
                                    <div className={scss.stars}>
                                        {stars.map((star, index) => (
                                            <Image
                                                width={20}
                                                height={20}
                                                key={index}
                                                src={
                                                    index <= currentRating
                                                        ? star
                                                        : star0
                                                } // Звезды серые по умолчанию, окрашиваются по клику
                                                alt={`star ${index}`}
                                                style={{
                                                    cursor: "pointer",
                                                    opacity:
                                                        index <= currentRating
                                                            ? 1
                                                            : 0.5,
                                                }}
                                                onClick={() =>
                                                    handleStarClick(index)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                                <h1 className={scss.ratingUsers}>
                                    Вы выбрали:{" "}
                                    {userRating !== null
                                        ? userRating
                                        : "Нет оценки"}{" "}
                                    звёзд
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
