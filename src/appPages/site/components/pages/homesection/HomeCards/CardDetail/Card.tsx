"use client";
import scss from "./Card.module.scss";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetBooksDetailQuery } from "@/redux/api/books";
import priceIcon from "@/assets/Icons/HomePrice.png";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import back from "@/assets/Icons/Back.png";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import DetailCards from "./CardDetailSection/DetailCards/DetailCards";
import CardComments from "./CardDetailSection/CardComments/CardComments";
import {
    useAddKatFavoriteItemMutation,
    useGetKatFavoriteQuery,
    useRemoveKatFavoriteItemMutation,
} from "@/redux/api/favorite";
import { useGetMeQuery } from "@/redux/api/auth";
import {
    useDeleteCartMutation,
    useAddToCartMutation,
    useGetCartItemsQuery,
} from "@/redux/api/addToCart";

interface Book {
    id: number;
    book_name: string;
    author: string;
    price: number;
    average_rating: number;
    janre: { janre_name: string }[];
    book_images: { book_images: string }[];
}

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

const CardDetail = () => {
    const router = useRouter();
    const { id } = useParams();
    const bookId = typeof id === "string" ? parseInt(id, 10) : undefined;

    const [showModal, setShowModal] = useState(false);
    const { data: cartData = [] } = useGetCartItemsQuery();
    const [isInCart, setIsInCart] = useState(false);
    const { data, isLoading, isError } = useGetBooksDetailQuery(bookId ?? -1);

    const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
    const userId = meData?.id || null;

    const { data: favoriteData = [], isLoading: isFavLoading } =
        useGetKatFavoriteQuery();
    const [addToCartMutation] = useAddToCartMutation();
    const [deleteCartItem] = useDeleteCartMutation();

    const [addFavorite] = useAddKatFavoriteItemMutation();
    const [removeFavorite] = useRemoveKatFavoriteItemMutation();

    useEffect(() => {
        if (cartData && data) {
            setIsInCart(cartData.some((item) => item.books.id === data.id));
        }
    }, [cartData, data]);

    const toggleLike = async (bookId: number) => {
        if (!userId) {
            alert("Ошибка: Пользователь не авторизован.");
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
                if (favoriteItem?.id) {
                    await removeFavorite(favoriteItem.id).unwrap();
                }
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

    const handleToggleCart = async () => {
        if (!userId) {
            alert(
                "Пожалуйста, авторизуйтесь, чтобы добавлять книги в корзину."
            );
            return;
        }

        try {
            const isBookInCart = cartData.some(
                (item) => item.books.id === data?.id
            );

            if (isBookInCart) {
                const cartItem = cartData.find(
                    (item) => item.books.id === data?.id
                );
                if (cartItem) {
                    await deleteCartItem(cartItem.books.id).unwrap();
                    setIsInCart(false);
                }
            } else {
                const requestBody = {
                    books: {
                        book_name: data?.book_name,
                        price: data?.price,
                    },
                    quantity: 0,
                    books_id: data?.id,
                };
                await addToCartMutation(requestBody).unwrap();
                setIsInCart(true);
                setShowModal(true);
                setTimeout(() => setShowModal(false), 2000);
            }
        } catch (error) {
            console.error("Ошибка изменения корзины:", error);
            alert("Произошла ошибка при работе с корзиной.");
        }
    };

    if (isLoading) {
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    }

    if (isError || !data) {
        return <div>Ошибка загрузки данных. Попробуйте позже.</div>;
    }

    return (
        <>
            <section className={scss.CardDetail}>
                <div className="container">
                    <div className={scss.content}>
                        <Image
                            onClick={() => router.push(`/`)}
                            className={scss.backButton}
                            src={back}
                            alt="Back to home"
                            width={100}
                            height={100}
                            priority
                        />
                        <div className={scss.detailContent}>
                            <div className={scss.bookContent}>
                                <Image
                                    src={
                                        data.book_images?.[0]?.book_images ||
                                        defaultBook
                                    }
                                    alt={`Book cover for ${data.book_name}`}
                                    className={scss.cardImg}
                                    width={240}
                                    height={300}
                                    priority
                                />
                                <div className={scss.cardInfo}>
                                    <div className={scss.bookNameBlock}>
                                        <h1 className={scss.bookName}>
                                            {data.book_name}
                                        </h1>
                                        <h2 className={scss.authorName}>
                                            {data.author}
                                        </h2>
                                    </div>
                                    <div className={scss.bookGenreBlock}>
                                        {data.janre?.map((genre, index) => (
                                            <p
                                                key={`${genre.janre_name}-${index}`}
                                                className={scss.genreBlock}
                                            >
                                                Жанр: {genre.janre_name}
                                            </p>
                                        ))}
                                    </div>
                                    <Image
                                        width={150}
                                        height={30}
                                        src={
                                            STAR_RATINGS[
                                                Math.floor(data.average_rating)
                                            ] || star0
                                        }
                                        className={scss.ratingStars}
                                        alt={`Rating: ${data.average_rating} stars`}
                                    />
                                    <button className={scss.bookPriceBlock}>
                                        <Image
                                            className={scss.priceIcon}
                                            src={priceIcon}
                                            alt="Price icon"
                                            width={100}
                                            height={100}
                                        />
                                        {data.price} сом
                                    </button>
                                    <div className={scss.bookActAndDesBlock}>
                                        <h1 className={scss.description}>
                                            {data.description}
                                        </h1>
                                        <div className={scss.actions}>
                                            <button
                                                onClick={handleToggleCart}
                                                className={scss.cardButton}
                                                aria-label="Add to cart"
                                            >
                                                {isInCart
                                                    ? "Убрать из корзины"
                                                    : "В корзину"}
                                            </button>
                                            {showModal && (
                                                <div className={scss.modal}>
                                                    <p>
                                                        Товар добавлен в
                                                        корзину✓
                                                    </p>
                                                </div>
                                            )}
                                            <button
                                                className={scss.buttonLike}
                                                onClick={() =>
                                                    toggleLike(data.id)
                                                }
                                                aria-label={
                                                    favoriteData.some(
                                                        (item) =>
                                                            item.books_like
                                                                .id === data.id
                                                    )
                                                        ? "Удалить из избранного"
                                                        : "Добавить в избранное"
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
                                                                data.id
                                                        )
                                                            ? likeActive
                                                            : like
                                                    }
                                                    alt={
                                                        favoriteData.some(
                                                            (item) =>
                                                                item.books_like
                                                                    .id ===
                                                                data.id
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
                        </div>
                        <div className={scss.rating}>
                            <div className={scss.hr} />
                            <div className={scss.ratingContent}>
                                <p className={scss.ratingUsers}>
                                    Оценок: {data.total_ratings}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <DetailCards />
            <CardComments id={data.id} />
        </>
    );
};

export default CardDetail;
