import React from "react";
import scss from "./HomeCards.module.scss";
import Image from "next/image";
import star0 from "../../../../../../assets/Icons/star0.png";
import star1 from "../../../../../../assets/Icons/star1.png";
import star2 from "../../../../../../assets/Icons/star2.png";
import star3 from "../../../../../../assets/Icons/star3.jpg";
import star4 from "../../../../../../assets/Icons/star4.png";
import star5 from "../../../../../../assets/Icons/star5.jpg";
import price from "../../../../../../assets/Icons/HomePrice.png";
import img from "../../../../../../assets/bookIMG.jpg";

const HomeCards = () => {
    const data = [
        {
            id: 1,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Наставник человечества Мухаммад с.а.в",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [{ janre_name: "Романтика" }, { janre_name: "Драма" }],
        },
        {
            id: 2,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Гордость",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [{ janre_name: "Романтика" }, { janre_name: "Драма" }],
        },
        {
            id: 1,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Гордость",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [
                { janre_name: "Романтика" },
                { janre_name: "Романтика" },
                { janre_name: "Романтика" },
                { janre_name: "Драма" },
            ],
        },
        {
            id: 1,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Гордость",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [{ janre_name: "Романтика" }, { janre_name: "Драма" }],
        },
        {
            id: 1,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Наставник человечества Мухаммад с.а.в",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [{ janre_name: "Романтика" }, { janre_name: "Драма" }],
        },
        {
            id: 2,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Гордость",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [{ janre_name: "Романтика" }, { janre_name: "Драма" }],
        },
        {
            id: 1,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Гордость",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 1.0,
            total_ratings: 1,
            janre: [
                { janre_name: "Романтика" },
                { janre_name: "Романтика" },
                { janre_name: "Романтика" },
                { janre_name: "Драма" },
            ],
        },
        {
            id: 1,
            book_images: [
                {
                    book_images: "",
                },
            ],
            book_name: "Гордость",
            author: "Рашид Хайламаз",
            price: 1700,
            average_rating: 4.0,
            total_ratings: 1,
            janre: [{ janre_name: "Романтика" }, { janre_name: "Драма" }],
        },
    ];

    return (
        <section className={scss.HomeCards}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>КАТАЛОГ</h1>
                    <div className={scss.cards}>
                        {data.map((item, index) => (
                            <div key={index} className={scss.card}>
                                <Image
                                    width={150}
                                    height={200}
                                    quality={80}
                                    className={scss.bookImage}
                                    src={img}
                                    alt="Photo of book"
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.rating}>
                                        {item.average_rating === 0 && (
                                            <Image
                                                width={110}
                                                src={star0}
                                                alt="0 rating"
                                            />
                                        )}
                                        {item.average_rating === 1 && (
                                            <Image
                                                width={110}
                                                src={star1}
                                                alt="1 rating"
                                            />
                                        )}
                                        {item.average_rating === 2 && (
                                            <Image
                                                width={110}
                                                src={star2}
                                                alt="2 rating"
                                            />
                                        )}
                                        {item.average_rating === 3 && (
                                            <Image
                                                width={110}
                                                src={star3}
                                                alt="3 rating"
                                            />
                                        )}
                                        {item.average_rating === 4 && (
                                            <Image
                                                width={110}
                                                src={star4}
                                                alt="4 rating"
                                            />
                                        )}
                                        {item.average_rating === 5 && (
                                            <Image
                                                width={110}
                                                src={star5}
                                                alt="5 rating"
                                            />
                                        )}
                                    </div>
                                    <h1 className={scss.name}>
                                        {item.book_name}
                                    </h1>
                                    <h1 className={scss.author}>
                                        {item.author}
                                    </h1>
                                    <h1 className={scss.genre}>
                                        Жанр:
                                        {item.janre.map((janre, index) => (
                                            <span
                                                key={index}
                                                className={scss.janre}
                                            >
                                                {janre.janre_name}
                                                {index <
                                                    item.janre.length - 1 &&
                                                    ", "}
                                            </span>
                                        ))}
                                    </h1>
                                    <div className={scss.confirm}>
                                        <h1 className={scss.price}>
                                            <Image
                                                width={20}
                                                height={20}
                                                src={price}
                                                alt="price icon"
                                            />
                                            {item.price} c
                                        </h1>
                                        <div className={scss.actions}>
                                            <button className={scss.button}>
                                                КУПИТЬ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCards;
