"use client";

import React from "react";
import scss from "./Card.module.scss";
import priceIcon from "../../../../../../../assets/Icons/HomePrice.png";
import star0 from "../../../../../../../assets/Icons/star0.png";
import star1 from "../../../../../../../assets/Icons/star1.png";
import star2 from "../../../../../../../assets/Icons/star2.png";
import star3 from "../../../../../../../assets/Icons/star3.png";
import star4 from "../../../../../../../assets/Icons/star4.png";
import star5 from "../../../../../../../assets/Icons/star5.png";

import img from "../../../../../../../assets/image 19.png";
import back from "../../../../../../../assets/Icons/Back.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import CardComments from "./CardDetailSection/CardComments/CardComments";

const CardDetail = () => {
    const router = useRouter();

    const stars = [star0, star1, star2, star3, star4, star5];

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
            average_rating: 1.0,
            total_ratings: 1,
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
                                        <button className={scss.cardButton}>
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={scss.rating}>
                            <div className={scss.hr} />
                            <div className={scss.ratingContent}>
                                <h1 className={scss.ratingText}>
                                    Рейтинг книги
                                </h1>{" "}
                                <Image
                                    width={110}
                                    src={
                                        stars[data.books.total_ratings] || star0
                                    }
                                    alt={`${
                                        data.books.total_ratings || 0
                                    } rating`}
                                />
                                <h1 className={scss.ratingUsers}>
                                    Оценок: {data.books.average_rating}
                                </h1>{" "}
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
