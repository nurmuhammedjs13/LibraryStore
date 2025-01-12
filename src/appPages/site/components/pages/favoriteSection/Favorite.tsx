"use client";
import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    useGetFavoriteQuery,
    useRemoveFavoriteItemMutation,
} from "@/redux/api/favorite";
import scss from "./Favorite.module.scss";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import likeActive from "@/assets/Icons/likeActive.png";
import { useGetMeQuery } from "@/redux/api/auth";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

interface Genre {
    janre_name: string;
}

interface Book {
    book_images: { book_images: string }[];
    book_name: string;
    author: string;
    price: number;
    average_rating: number;
    total_ratings: number;
    janre: Genre[];
}

interface KatalogBooksLike {
    id: number;
    books: Book;
}

interface FavoriteItem {
    id: number;
    katalog_books_like: KatalogBooksLike;
    like_favorite: boolean;
}

interface FavoriteCardProps {
    favorite: FavoriteItem;
    isRemoving: boolean;
    onRemove: (favoriteId: number) => void;
    onNavigate: (bookId: number) => void;
}

const FavoriteCard: FC<FavoriteCardProps> = ({
    favorite,
    isRemoving,
    onRemove,
    onNavigate,
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const averageRating = Math.round(
        favorite.katalog_books_like.books.average_rating || 0
    );

    return (
        <div className={scss.card}>
            <Image
                onClick={() => onNavigate(favorite.katalog_books_like.id)}
                width={150}
                height={200}
                quality={80}
                className={scss.bookImage}
                src={
                    favorite.katalog_books_like.books.book_images[0]
                        ?.book_images || defaultBook
                }
                alt={`Cover of ${favorite.katalog_books_like.books.book_name}`}
                priority
            />
            <div className={scss.cardInfo}>
                <div className={scss.rating}>
                    <Image
                        width={110}
                        height={20}
                        className={scss.ratingImage}
                        src={STAR_RATINGS[averageRating] || star0}
                        alt={`Rating: ${averageRating} stars`}
                    />
                </div>
                <h2 className={scss.name}>
                    {favorite.katalog_books_like.books.book_name}
                </h2>
                <h3 className={scss.author}>
                    {favorite.katalog_books_like.books.author}
                </h3>
                <p className={scss.genre}>
                    Жанр:
                    {favorite.katalog_books_like.books.janre.map((genre, i) => (
                        <span key={genre.janre_name} className={scss.janre}>
                            {genre.janre_name}
                            {i <
                                favorite.katalog_books_like.books.janre.length -
                                    1 && ", "}
                        </span>
                    ))}
                </p>
                <div className={scss.confirm}>
                    <div className={scss.price}>
                        Цена: {favorite.katalog_books_like.books.price}₽
                    </div>
                    <div className={scss.actions}>
                        <button
                            onClick={handleAddToCart}
                            className={scss.button}
                            aria-label="Add to cart"
                        >
                            В корзину
                        </button>
                        {showModal && (
                            <div className={scss.modal}>
                                <p>Товар добавлен в корзину✓</p>
                            </div>
                        )}
                        <button
                            onClick={() => onRemove(favorite.id)}
                            className={scss.buttonLike}
                            disabled={isRemoving}
                            aria-label="Remove from favorites"
                        >
                            <Image
                                width={24}
                                height={24}
                                src={likeActive}
                                alt="Remove from favorites"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoadingState = () => (
    <div className={scss.loaderBlock}>
        <div className={scss.loader}></div>
    </div>
);

const ErrorState = () => (
    <div className={scss.loaderBlock}>
        <div>Ошибка загрузки данных. Попробуйте позже.</div>
    </div>
);

const Favorite: React.FC = () => {
    const router = useRouter();
    const { data: meData } = useGetMeQuery();
    const userId = meData?.id;
    const {
        data: favoriteData = [],
        isLoading,
        isError,
    } = useGetFavoriteQuery();
    const [removeFavorite, { isLoading: isRemoving }] =
        useRemoveFavoriteItemMutation();

    const removeFromFavorite = async (favoriteId: number) => {
        if (!userId) {
            alert("Ошибка: Пользователь не авторизован.");
            return;
        }
        try {
            await removeFavorite(favoriteId).unwrap();
        } catch (error) {
            alert("Не удалось удалить книгу из избранного.");
        }
    };

    const navigateToBook = (id: number) => {
        if (!id) {
            console.error("Invalid book ID:", id);
            return;
        }
        router.push(`/books/${id}`);
    };

    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState />;

    return (
        <section className={scss.Favorite}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>ИЗБРАННОЕ</h1>
                    <div className={scss.cards}>
                        {favoriteData.map((favorite, index) => (
                            <FavoriteCard
                                key={index}
                                favorite={favorite}
                                isRemoving={isRemoving}
                                onRemove={removeFromFavorite}
                                onNavigate={navigateToBook}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Favorite;
