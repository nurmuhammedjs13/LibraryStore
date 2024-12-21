"use client";

import React, { useState, useEffect } from "react";
import scss from "./MainCatalog.module.scss";
import { useGetGenreQuery } from "@/redux/api/genre";
import { useGetBooksQuery } from "@/redux/api/books";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import price from "@/assets/Icons/HomePrice.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainCatalog = () => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const {
        data: books = [],
        isLoading: isBooksLoading,
        isError: isBooksError,
    } = useGetBooksQuery();

    const {
        data: genres = [],
        isLoading: isGenresLoading,
        isError: isGenresError,
    } = useGetGenreQuery();

    const [isRatingChecked, setIsRatingChecked] = useState(false);
    const [isDiscountChecked, setIsDiscountChecked] = useState(false);
    const [likedItems, setLikedItems] = useState<number[]>([]);

    const stars = [star0, star1, star2, star3, star4, star5];

    const handleRatingChange = () => {
        setIsRatingChecked(!isRatingChecked);
    };

    const handleDiscountChange = () => {
        setIsDiscountChecked(!isDiscountChecked);
    };

    const toggleLike = (id: number) => {
        setLikedItems((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    // Set isClient to true after the component mounts (client-side only)
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Avoid rendering before the component is mounted

    if (isBooksError || isGenresError) {
        return (
            <div className={scss.error}>
                Произошла ошибка при загрузке данных.
            </div>
        );
    }

    if (isBooksLoading || isGenresLoading) {
        return <div className={scss.loading}>Загрузка...</div>;
    }

    return (
        <section className={scss.MainCatalog}>
            <div className="container">
                <div className={scss.content}>
                    <div className={scss.filterBlock}>
                        <div className={scss.genresBlock}>
                            <h1 className={scss.genreTitle}>Жанры</h1>
                            <div className={scss.genres}>
                                {genres?.map((genre) => (
                                    <h1
                                        key={genre.janre_name}
                                        className={scss.genre}
                                    >
                                        {genre.janre_name}
                                    </h1>
                                ))}
                            </div>
                        </div>
                        <div className={scss.price}>
                            <h1 className={scss.priceTitle}>Цена</h1>
                            <div className={scss.priceSection}>
                                <input
                                    type="number"
                                    placeholder="от"
                                    className={scss.priceInput}
                                />
                                <input
                                    type="number"
                                    placeholder="до"
                                    className={scss.priceInput}
                                />
                            </div>
                        </div>
                        <div className={scss.checkBox}>
                            <div className={scss.rating}>
                                <h1 className={scss.ratingText}>Рейтинг</h1>
                                <label className={scss.switch}>
                                    <input
                                        type="checkbox"
                                        checked={isRatingChecked}
                                        onChange={handleRatingChange}
                                    />
                                    <span className={scss.slider}></span>
                                </label>
                            </div>
                            <div className={scss.discount}>
                                <h1 className={scss.discountText}>Скидки</h1>
                                <label className={scss.switch}>
                                    <input
                                        type="checkbox"
                                        checked={isDiscountChecked}
                                        onChange={handleDiscountChange}
                                    />
                                    <span className={scss.slider}></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={scss.CardBlock}>
                        <div className={scss.cardsNav}>
                            <Link href={"/"} className={scss.nav1}>
                                Главная ›{" "}
                            </Link>
                            <Link href={"/catalog"} className={scss.nav2}>
                                Каталог
                            </Link>
                        </div>
                        <div className={scss.hr}></div>
                        <div className={scss.cards}>
                            {books.map((item) => (
                                <div key={item.id} className={scss.card}>
                                    <Image
                                        onClick={() =>
                                            router.push(`/books/${item.id}`)
                                        }
                                        width={150}
                                        height={200}
                                        quality={80}
                                        className={scss.bookImage}
                                        src={
                                            item.book_images[0]?.book_images ||
                                            ""
                                        }
                                        alt="Photo of book"
                                    />
                                    <div className={scss.cardInfo}>
                                        <div className={scss.rating}>
                                            <Image
                                                width={110}
                                                src={
                                                    stars[
                                                        item.average_rating
                                                    ] || star0
                                                }
                                                alt={`${
                                                    item.average_rating || 0
                                                } rating`}
                                            />
                                        </div>
                                        <h1 className={scss.name}>
                                            {item.book_name}
                                        </h1>
                                        <h1 className={scss.author}>
                                            {item.author}
                                        </h1>
                                        <h1 className={scss.genre}>
                                            Жанр:
                                            {item.janre.map((janre, i) => (
                                                <span
                                                    key={janre.janre_name}
                                                    className={scss.janre}
                                                >
                                                    {janre.janre_name}
                                                    {i <
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
                                                    В корзину
                                                </button>
                                                <button
                                                    className={scss.buttonLike}
                                                    onClick={() =>
                                                        toggleLike(item.id)
                                                    }
                                                >
                                                    <Image
                                                        width={24}
                                                        height={24}
                                                        src={
                                                            likedItems.includes(
                                                                item.id
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainCatalog;
