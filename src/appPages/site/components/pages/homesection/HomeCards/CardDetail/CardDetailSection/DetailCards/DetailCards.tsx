"use client";
import React, { useState } from "react";
import scss from "./DetailCards.module.scss";
import Image from "next/image";
import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import price from "@/assets/Icons/HomePrice.png";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import { useRouter } from "next/navigation";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import { useGetBooksQuery } from "@/redux/api/books";
import {
  useAddKatFavoriteItemMutation,
  useGetKatFavoriteQuery,
  useRemoveKatFavoriteItemMutation,
} from "@/redux/api/favorite";
import { useGetMeQuery } from "@/redux/api/auth";

interface Book {
  id: number;
  book_name: string;
  author: string;
  price: number;
  average_rating: number;
  book_images: { book_images: string }[];
  janre: { janre_name: string }[];
}

const DetailCards = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // API запросы всегда вызываются в одном порядке
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  const { data: favoriteData = [], isLoading: isFavLoading } = useGetKatFavoriteQuery();
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
  const [addFavorite] = useAddKatFavoriteItemMutation();
  const [removeFavorite] = useRemoveKatFavoriteItemMutation();

  // Вспомогательные переменные
  const userId = meData?.id || null;
  const stars = [star0, star1, star2, star3, star4, star5];

  // Функция добавления в корзину
  const handleAddToCart = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  // Функция переключения "Избранное"
  const toggleLike = async (bookId: number) => {
    if (!userId) {
      alert("Ошибка: Пользователь не авторизован.");
      return;
    }

    const isLiked = favoriteData.some(
      (item) => item.katalog_books_like.id === bookId
    );

    try {
      if (isLiked) {
        const favoriteItem = favoriteData.find(
          (item) => item.katalog_books_like.id === bookId
        );
        if (favoriteItem?.id) {
          await removeFavorite(favoriteItem.id).unwrap();
        }
      } else {
        await addFavorite({
          katalog_books_like: bookId,
          user_favorite: userId,
          like_favorite: true,
        }).unwrap();
      }
    } catch (error) {
      console.error("Ошибка изменения избранного:", error);
    }
  };

  // Последние 12 книг
  const latestBooks: Book[] = books.slice(-12);

  // Рендер компонента
  return (
    <section className={scss.DetailCards}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={scss.cardsTitle}>Похожие книги</h1>
          {isLoading ? (
            <div className={scss.loaderBlock}>
              <div className={scss.loader}></div>
            </div>
          ) : isError ? (
            <div className={scss.loaderBlock}>
              <div>Ошибка загрузки данных. Попробуйте позже.</div>
            </div>
          ) : (
            <div className={scss.cards}>
              {latestBooks.map((item) => (
                <div key={item.id} className={scss.card}>
                  <Image
                    onClick={() => router.push(`${item.id}`)}
                    width={150}
                    height={200}
                    quality={80}
                    className={scss.bookImage}
                    src={item.book_images[0]?.book_images || defaultBook}
                    alt={`Book: ${item.book_name}`}
                  />
                  <div className={scss.cardInfo}>
                    <div className={scss.rating}>
                      <Image
                        width={110}
                        src={stars[item.average_rating] || star0}
                        alt={`${item.average_rating || 0} rating`}
                      />
                    </div>
                    <h1 className={scss.name}>{item.book_name}</h1>
                    <h1 className={scss.author}>{item.author}</h1>
                    <h1 className={scss.genre}>
                      Жанр:{" "}
                      {item.janre.map((janre, i) => (
                        <span key={janre.janre_name} className={scss.janre}>
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
                        <button
                          onClick={handleAddToCart}
                          className={scss.button}
                        >
                          В корзину
                        </button>
                        {showModal && (
                          <div className={scss.modal}>
                            <p>Товар добавлен в корзину✓</p>
                          </div>
                        )}
                        <button
                          className={scss.buttonLike}
                          onClick={() => toggleLike(item.id)}
                          aria-label={
                            favoriteData.some(
                              (book) =>
                                book.katalog_books_like.id === item.id
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
                                (book) =>
                                  book.katalog_books_like.id === item.id
                              )
                                ? likeActive
                                : like
                            }
                            alt={
                              favoriteData.some(
                                (book) =>
                                  book.katalog_books_like.id === item.id
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
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailCards;
