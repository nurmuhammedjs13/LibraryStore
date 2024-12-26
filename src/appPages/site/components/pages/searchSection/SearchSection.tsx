"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useGetBooksQuery } from "@/redux/api/books";
import useSearchStore from "@/stores/useSearchStrore";
import scss from "@/appPages/site/components/pages/homesection/HomeCards/HomeCards.module.scss";

import star0 from "@/assets/Icons/star0.png";
import star1 from "@/assets/Icons/star1.png";
import star2 from "@/assets/Icons/star2.png";
import star3 from "@/assets/Icons/star3.png";
import star4 from "@/assets/Icons/star4.png";
import star5 from "@/assets/Icons/star5.png";
import priceIcon from "@/assets/Icons/HomePrice.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";

const STAR_RATINGS = [star0, star1, star2, star3, star4, star5];

interface Book {
  id: number;
  book_name: string;
  author: string;
  price: number;
  average_rating: number;
  book_images: Array<{ book_images: string }>;
  janre: Array<{ janre_name: string }>;
}

const SearchSection = () => {
  const router = useRouter();
  const { data = [], isLoading, isError } = useGetBooksQuery();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { query } = useParams();
  const [likedItems, setLikedItems] = useState<number[]>([]);

  useEffect(() => {
    if (query) {
      setSearchQuery(Array.isArray(query) ? query[0] : query);
    }
  }, [query, setSearchQuery]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return [];
    return data.filter(
      (item) =>
        item.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author &&
          item.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [data, searchQuery]);

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const navigateToBook = (id: number) => {
    if (!id) {
      console.error("Invalid book ID:", id);
      return;
    }
    router.push(`/books/${id}`);
  };

  if (isLoading) {
    return (
      <div className={scss.loaderBlock}>
        <div className={scss.loader}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={scss.loaderBlock}>
        <div>Ошибка загрузки данных. Попробуйте позже.</div>
      </div>
    );
  }

  return (
    <section className={scss.HomeCards}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={scss.title}>Результаты поиска</h1>
          <div className={scss.cards}>
            {filteredData.length > 0 ? (
              filteredData.map((book: Book) => (
                <div key={book.id} className={scss.card}>
                  <Image
                    onClick={() => navigateToBook(book.id)}
                    width={150}
                    height={200}
                    quality={80}
                    className={scss.bookImage}
                    src={book.book_images[0]?.book_images || "/placeholder.png"}
                    alt={`Cover of ${book.book_name}`}
                    priority
                  />
                  <div className={scss.cardInfo}>
                    <div className={scss.rating}>
                      <Image
                        width={110}
                        height={20}
                        src={STAR_RATINGS[book.average_rating] || star0}
                        alt={`Rating: ${book.average_rating || 0} stars`}
                      />
                    </div>
                    <h2 className={scss.name}>{book.book_name}</h2>
                    <h3 className={scss.author}>{book.author}</h3>
                    <p className={scss.genre}>
                      Жанр:
                      {book.janre.map((genre, i) => (
                        <span key={genre.janre_name} className={scss.janre}>
                          {genre.janre_name}
                          {i < book.janre.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <div className={scss.confirm}>
                      <div className={scss.price}>
                        <Image
                          width={20}
                          height={20}
                          src={priceIcon}
                          alt="Price icon"
                        />
                        {book.price} c
                      </div>
                      <div className={scss.actions}>
                        <button
                          className={scss.button}
                          aria-label="Add to cart"
                        >
                          В корзину
                        </button>
                        <button
                          className={scss.buttonLike}
                          onClick={() => toggleLike(book.id)}
                          aria-label={
                            likedItems.includes(book.id)
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <Image
                            width={24}
                            height={24}
                            src={
                              likedItems.includes(book.id) ? likeActive : like
                            }
                            alt={
                              likedItems.includes(book.id)
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={scss.noResults}>
                Книги по вашему запросу не найдены.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
