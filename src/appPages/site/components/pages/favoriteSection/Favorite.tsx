"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    useGetKatFavoriteQuery,
    useRemoveKatFavoriteItemMutation,
} from "@/redux/api/favorite";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import likeActive from "@/assets/Icons/likeActive.png";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import scss from "./Favorite.module.scss";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

const FavoriteCards: React.FC = () => {
    const router = useRouter();
    const { data: favoriteData = [], isLoading } = useGetKatFavoriteQuery();
    const [removeFavorite] = useRemoveKatFavoriteItemMutation();

    const [cartItems, setCartItems] = useState<number[]>([]);
    const [cartModal, setCartModal] = useState<boolean>(false);

    const handleRemoveFavorite = async (favoriteId: number) => {
        try {
            await removeFavorite(favoriteId).unwrap();
        } catch (error) {
            console.error("Ошибка удаления из избранного:", error);
        }
    };

    const addToCart = (bookId: number) => {
        if (!cartItems.includes(bookId)) {
            setCartItems((prev) => [...prev, bookId]);
            setCartModal(true);
            setTimeout(() => setCartModal(false), 2000);
        }
    };

    const navigateToBook = (id: number) => {
        router.push(`/books/${id}`);
    };
    if (isLoading) {
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    }

    return (
        <section className={scss.Favorite}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>Избранное</h1>
                    <div className={scss.cards}>
                        {favoriteData.map((favorite) => (
                            <div key={favorite.id} className={scss.card}>
                                <Image
                                    onClick={() =>
                                        navigateToBook(favorite.books_like.id)
                                    }
                                    width={150}
                                    height={200}
                                    quality={80}
                                    className={scss.bookImage}
                                    src={
                                        favorite.books_like.book_images[0]
                                            ?.book_images || defaultBook
                                    }
                                    alt={`Обложка ${favorite.books_like.book_name}`}
                                    priority
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.rating}>
                                        <Image
                                            width={110}
                                            height={20}
                                            className={scss.ratingImage}
                                            src={
                                                STAR_RATINGS[
                                                    favorite.books_like
                                                        .average_rating
                                                ] || star0
                                            }
                                            alt={`Рейтинг: ${
                                                favorite.books_like
                                                    .average_rating || 0
                                            } звёзд`}
                                        />
                                    </div>
                                    <h2 className={scss.name}>
                                        {favorite.books_like.book_name}
                                    </h2>
                                    <h3 className={scss.author}>
                                        {favorite.books_like.author}
                                    </h3>
                                    <p className={scss.genre}>
                                        Жанр:{" "}
                                        {favorite.books_like.janre.map(
                                            (genre, i) => (
                                                <span
                                                    key={genre.janre_name}
                                                    className={scss.janre}
                                                >
                                                    {genre.janre_name}
                                                    {i <
                                                        favorite.books_like
                                                            .janre.length -
                                                            1 && ", "}
                                                </span>
                                            )
                                        )}
                                    </p>
                                    <div className={scss.confirm}>
                                        <div className={scss.price}>
                                            <Image
                                                width={20}
                                                className={scss.priceIcon}
                                                height={20}
                                                src={priceIcon}
                                                alt="Иконка цены"
                                            />
                                            {favorite.books_like.price} c
                                        </div>
                                        <div className={scss.actions}>
                                            <button
                                                className={scss.button}
                                                onClick={() =>
                                                    addToCart(
                                                        favorite.books_like.id
                                                    )
                                                }
                                            >
                                                {cartItems.includes(
                                                    favorite.books_like.id
                                                )
                                                    ? "В корзине"
                                                    : "В корзину"}
                                            </button>
                                            <button
                                                className={scss.buttonLike}
                                                onClick={() =>
                                                    handleRemoveFavorite(
                                                        favorite.id
                                                    )
                                                }
                                                aria-label="Удалить из избранного"
                                            >
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    src={likeActive}
                                                    alt="Удалить из избранного"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {cartModal && (
                        <div className={scss.modal}>
                            <p>Товар добавлен в корзину✓</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FavoriteCards;
