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
import { useGetMeQuery } from "@/redux/api/auth";
import {
    useAddToCartMutation,
    useGetCartItemsQuery,
} from "@/redux/api/addToCart";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

const FavoriteCards: React.FC = () => {
    const router = useRouter();
    const { data: favoriteData = [], isLoading } = useGetKatFavoriteQuery();
    const [removeFavorite] = useRemoveKatFavoriteItemMutation();
    const [addToCart] = useAddToCartMutation();
    const { data: cartItems } = useGetCartItemsQuery(); // Get cart items
    const { data: meData } = useGetMeQuery();
    const userId = meData?.id || null;

    const [cartModal, setCartModal] = useState<boolean>(false);
    const [addedBookId, setAddedBookId] = useState<number | null>(null);

    const handleRemoveFavorite = async (favoriteId: number) => {
        try {
            await removeFavorite(favoriteId).unwrap();
        } catch (error) {
            console.error("Ошибка удаления из избранного:", error);
        }
    };

    const handleAddToCart = async (
        book: FAVORITE.GetKatFavoriteItemsReaponse[0]["books_like"]
    ) => {
        if (!userId) {
            alert(
                "Пожалуйста, авторизуйтесь, чтобы добавлять книги в корзину."
            );
            return;
        }

        try {
            const cartRequest: ADDTOCART.AddToCardRequest = {
                books_id: book.id,
                quantity: 1,
                books: {
                    book_name: book.book_name,
                    author: book.author,
                    price: book.price,
                },
            };

            await addToCart(cartRequest).unwrap();

            setCartModal(true);
            setAddedBookId(book.id);

            setTimeout(() => {
                setCartModal(false);
                setAddedBookId(null);
            }, 3000);
        } catch (error) {
            console.error("Ошибка добавления в корзину:", error);
        }
    };

    const navigateToBook = (id: number) => {
        router.push(`/books/${id}`);
    };

    const isBookInCart = (bookId: number) => {
        return cartItems?.some((item) => item.books.id === bookId) || false;
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
                    {favoriteData.length === 0 ? (
                        <p className={scss.emptyState}>
                            У вас пока нет избранных книг
                        </p>
                    ) : (
                        <div className={scss.cards}>
                            {favoriteData.map((favorite) => {
                                const book = favorite.books_like;
                                const isInCart = isBookInCart(book.id);

                                return (
                                    <div
                                        key={favorite.id}
                                        className={scss.card}
                                    >
                                        <Image
                                            onClick={() =>
                                                navigateToBook(book.id)
                                            }
                                            width={150}
                                            height={200}
                                            quality={80}
                                            className={scss.bookImage}
                                            src={
                                                book.book_images[0]
                                                    ?.book_images || defaultBook
                                            }
                                            alt={`Обложка ${book.book_name}`}
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
                                                            book.average_rating
                                                        ] || star0
                                                    }
                                                    alt={`Рейтинг: ${
                                                        book.average_rating || 0
                                                    } звёзд`}
                                                />
                                            </div>
                                            <h2 className={scss.name}>
                                                {book.book_name}
                                            </h2>
                                            <h3 className={scss.author}>
                                                {book.author}
                                            </h3>
                                            <p className={scss.genre}>
                                                Жанр:{" "}
                                                {book.janre.map((genre, i) => (
                                                    <span
                                                        key={genre.janre_name}
                                                        className={scss.janre}
                                                    >
                                                        {genre.janre_name}
                                                        {i <
                                                            book.janre.length -
                                                                1 && ", "}
                                                    </span>
                                                ))}
                                            </p>
                                            <div className={scss.confirm}>
                                                <div className={scss.price}>
                                                    <Image
                                                        width={20}
                                                        className={
                                                            scss.priceIcon
                                                        }
                                                        height={20}
                                                        src={priceIcon}
                                                        alt="Иконка цены"
                                                    />
                                                    {book.price} c
                                                </div>
                                                <div className={scss.actions}>
                                                    <button
                                                        className={scss.button}
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                book
                                                            )
                                                        }
                                                        disabled={isInCart}
                                                    >
                                                        {isInCart
                                                            ? "В корзине"
                                                            : "В корзину"}
                                                    </button>
                                                    <button
                                                        className={
                                                            scss.buttonLike
                                                        }
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
                                );
                            })}
                        </div>
                    )}
                    {cartModal && (
                        <div className={scss.modal}>
                            <p>Товар добавлен в корзину ✓</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FavoriteCards;
