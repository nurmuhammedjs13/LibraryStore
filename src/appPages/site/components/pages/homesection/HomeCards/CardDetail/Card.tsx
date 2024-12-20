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
import { useRouter, useSearchParams } from "next/navigation";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import CardComments from "./CardDetailSection/CardComments/CardComments";
import { useGetBooksQuery } from "@/redux/api/books";

const CardDetail = () => {
    const searchParams = useSearchParams();
    const bookId = Number(searchParams.get("id"));

    const router = useRouter();
    const stars = [star0, star1, star2, star3, star4, star5];
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [userRating, setUserRating] = useState<number>(0);
    const { data = [], isLoading, isError } = useGetBooksQuery();

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

    const selectedBook = data.find((book) => book.id === bookId);

    if (!selectedBook)
        return (
            <div className={scss.loaderBlock}>
                <div>Книга с ID {bookId} не найдена.</div>
            </div>
        );

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
                                    src={
                                        selectedBook.book_images[0].book_images
                                    }
                                    alt="img of book"
                                    className={scss.cardImg}
                                    width={1000}
                                    height={1200}
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.bookNameBlock}>
                                        <h1 className={scss.bookName}>
                                            {selectedBook.book_name}
                                        </h1>
                                        <h1 className={scss.authorName}>
                                            {selectedBook.author}
                                        </h1>
                                    </div>
                                    <div className={scss.bookGenreBlock}>
                                        {selectedBook.janre.map(
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
                                                    selectedBook.average_rating
                                                )
                                            ]
                                        }
                                        alt={`Рейтинг ${selectedBook.average_rating}`}
                                    />
                                    <button className={scss.bookPriceBlock}>
                                        <Image
                                            className={scss.priceIcon}
                                            src={priceIcon}
                                            alt="icon of price"
                                            width={100}
                                            height={100}
                                        />
                                        {selectedBook.price} сом
                                    </button>
                                    <div className={scss.bookActAndDesBlock}>
                                        <h1 className={scss.description}>
                                            {/* {selectedBook.description} описание */}
                                        </h1>
                                        <div className={scss.actions}>
                                            <button className={scss.cardButton}>
                                                В корзину
                                            </button>
                                            <button
                                                className={scss.buttonLike}
                                                onClick={() =>
                                                    toggleLike(selectedBook.id)
                                                }
                                            >
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    src={
                                                        likedItems.includes(
                                                            selectedBook.id
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
                                    Оценок: {selectedBook.total_ratings}
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
