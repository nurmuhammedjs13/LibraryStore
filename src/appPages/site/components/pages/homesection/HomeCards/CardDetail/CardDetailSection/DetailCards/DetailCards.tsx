"use client";

import React, { useState } from "react";
import scss from "./DetailCards.module.scss";
import img from "@/assets/image 33.png";
import Image from "next/image";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import price from "@/assets/Icons/HomePrice.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import { useRouter } from "next/navigation";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";

interface Book {
    id: number;
    book_name: string;
    author: string;
    price: number;
    average_rating: number;
    book_images: { book_images: any }[];
    janre: { janre_name: any }[];
}
const DetailCards = () => {
    const router = useRouter();

    const [likedItems, setLikedItems] = useState<number[]>([]);
    const stars = [star0, star1, star2, star3, star4, star5];

    const data = [
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
        {
            id: 1,
            book_name: "ответ",
            author: "John sina",
            price: 1900,
            average_rating: 4,
            book_images: [{ book_images: img }],
            janre: [{ janre_name: "романтика" }],
        },
    ];

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

    const latestBooks: Book[] = data.slice(-12);

    return (
        <section className={scss.DetailCards}>
            <div className="container">
                <div className={scss.content}>
                    {latestBooks.map((item) => (
                        <div key={item.id} className={scss.card}>
                            <Image
                                onClick={() => router.push(`books/${item.id}`)}
                                width={150}
                                height={200}
                                quality={80}
                                className={scss.bookImage}
                                src={item.book_images[0]?.book_images || ""}
                                alt="Photo of book"
                            />
                            <div className={scss.cardInfo}>
                                <div className={scss.rating}>
                                    <Image
                                        width={110}
                                        src={
                                            stars[item.average_rating] || star0
                                        }
                                        alt={`${
                                            item.average_rating || 0
                                        } rating`}
                                    />
                                </div>
                                <h1 className={scss.name}>{item.book_name}</h1>
                                <h1 className={scss.author}>{item.author}</h1>
                                <h1 className={scss.genre}>
                                    Жанр:
                                    {item.janre.map((janre, i) => (
                                        <span
                                            key={janre.janre_name}
                                            className={scss.janre}
                                        >
                                            {janre.janre_name}
                                            {i < item.janre.length - 1 && ", "}
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
                                            В корзину
                                        </button>
                                        <button
                                            className={scss.buttonLike}
                                            onClick={() => toggleLike(item.id)}
                                        >
                                            <Image
                                                width={24}
                                                height={24}
                                                src={
                                                    likedItems.includes(item.id)
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetailCards;
