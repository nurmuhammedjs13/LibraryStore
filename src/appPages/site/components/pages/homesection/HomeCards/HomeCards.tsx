"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetBooksQuery } from "@/redux/api/books";
import {
    useGetKatFavoriteQuery,
    useAddKatFavoriteItemMutation,
    useRemoveKatFavoriteItemMutation,
} from "@/redux/api/favorite";
import { useGetMeQuery } from "@/redux/api/auth";
import scss from "./HomeCards.module.scss";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import Link from "next/link";
import {
    useAddToCartMutation,
    useDeleteCartMutation,
    useGetCartItemsQuery,
} from "@/redux/api/addToCart";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];
const BOOKS_TO_DISPLAY = 12;

interface Book {
    id: number;
    book_name: string;
    author: string;
    price: number;
    average_rating: number;
    janre: { janre_name: string }[];
    book_images: { book_images: string }[];
}

const HomeCards: React.FC = () => {
    const router = useRouter();
    const [cartModal, setCartModal] = useState(false);
    const { data: books = [], isLoading: isBooksLoading } = useGetBooksQuery();
    const { data: favoriteData = [] } = useGetKatFavoriteQuery();
    const { data: meData } = useGetMeQuery();
    const { data: cartData = [] } = useGetCartItemsQuery();

    const [addFavorite] = useAddKatFavoriteItemMutation();
    const [removeFavorite] = useRemoveKatFavoriteItemMutation();
    const [addToCartMutation] = useAddToCartMutation();
    const [deleteCartItem] = useDeleteCartMutation();

    const userId = meData?.id || null;

    const handleToggleLike = async (bookId: number) => {
        if (!userId) {
            alert(
                "Пожалуйста, авторизуйтесь, чтобы добавлять книги в избранное."
            );
            return;
        }

        const isLiked = favoriteData.some(
            (item) => item.books_like.id === bookId
        );

        try {
            if (isLiked) {
                const favoriteItem = favoriteData.find(
                    (item) => item.books_like.id === bookId
                );
                if (favoriteItem?.id)
                    await removeFavorite(favoriteItem.id).unwrap();
            } else {
                await addFavorite({
                    books_like: bookId,
                    user_favorite: userId,
                    like_favorite: true,
                }).unwrap();
            }
        } catch (error) {
            console.error("Ошибка изменения избранного:", error);
        }
    };

    const handleToggleCart = async (book: Book) => {
        if (!userId) {
            alert(
                "Пожалуйста, авторизуйтесь, чтобы добавлять книги в корзину."
            );
            return;
        }

        const isInCart = cartData.some((item) => item.books_id === book.id);

        try {
            if (isInCart) {
                const cartItem = cartData.find(
                    (item) => item.books_id === book.id
                );
                if (cartItem?.books_id)
                    await deleteCartItem(cartItem?.books_id).unwrap();
            } else {
                const requestBody = {
                    books: {
                        book_name: book.book_name,
                        price: book.price,
                    },
                    quantity: 0,
                    books_id: book.id,
                };
                await addToCartMutation(requestBody).unwrap();
                setCartModal(true);
                setTimeout(() => setCartModal(false), 2000);
            }
        } catch (error) {
            console.error("Ошибка изменения корзины:", error);
        }
    };

    const navigateToBook = (id: number) => router.push(`/books/${id}`);

    if (isBooksLoading) {
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    }

    const latestBooks = books.slice(-BOOKS_TO_DISPLAY);

    return (
        <section className={scss.HomeCards}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>КАТАЛОГ</h1>
                    <div className={scss.cards}>
                        {latestBooks.map((book) => (
                            <div key={book.id} className={scss.card}>
                                <Image
                                    onClick={() => navigateToBook(book.id)}
                                    width={150}
                                    height={200}
                                    quality={80}
                                    className={scss.bookImage}
                                    src={
                                        book.book_images[0]?.book_images ||
                                        defaultBook
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
                                                    Math.floor(
                                                        book.average_rating
                                                    )
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
                                                {i < book.janre.length - 1 &&
                                                    ", "}
                                            </span>
                                        ))}
                                    </p>
                                    <div className={scss.confirm}>
                                        <div className={scss.price}>
                                            <Image
                                                width={20}
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
                                                    handleToggleCart(book)
                                                }
                                            >
                                                {cartData?.some(
                                                    (item) =>
                                                        item?.books_id ===
                                                        book.id
                                                )
                                                    ? "В корзине"
                                                    : "В корзину"}
                                            </button>
                                            <button
                                                className={scss.buttonLike}
                                                onClick={() =>
                                                    handleToggleLike(book.id)
                                                }
                                            >
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    src={
                                                        favoriteData.some(
                                                            (item) =>
                                                                item.books_like
                                                                    .id ===
                                                                book.id
                                                        )
                                                            ? likeActive
                                                            : like
                                                    }
                                                    alt={
                                                        favoriteData.some(
                                                            (item) =>
                                                                item.books_like
                                                                    .id ===
                                                                book.id
                                                        )
                                                            ? "Удалить из избранного"
                                                            : "Добавить в избранное"
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/catalog" className={scss.buttonToCatalog}>
                        Смотреть еще
                    </Link>
                </div>
                {cartModal && (
                    <div className={scss.modal}>
                        <p>Товар добавлен в корзину ✓</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomeCards;
