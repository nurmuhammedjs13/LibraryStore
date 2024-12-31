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
import back from "@/assets/Icons/Back.png";
import filter from "@/assets/Icons/filter.png";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import Link from "next/link";
import Image from "next/image";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import { useRouter } from "next/navigation";
import { useGetDiscountQuery } from "@/redux/api/discountSlider";

type Genre = {
    janre_name: string;
};

type BookImage = {
    book_images: string;
};

type BaseBookType = {
    id: number;
    book_images: BookImage[];
    book_name: string;
    author: string;
    price: number;
    discount: number;
    description: string;
    average_rating: number;
    total_ratings: number;
    janre: Genre[];
};

type BookType = BaseBookType & {
    isDiscountBook?: boolean;
    originalBookId?: number;
};

type DiscountBookType = {
    id: number;
    books: {
        book_images: BookImage[];
        book_name: string;
        author: string;
        price: number;
        average_rating: number;
        total_ratings: number;
        janre: Genre[];
        description: string;
        ratings: Array<{
            id: number;
            user_rating: {
                username: string;
            };
            book: number;
            aksia_books: unknown;
            katalog_books: unknown;
            katalog_aksia_books: unknown;
            stars: number;
            comment: string;
            created_date: string;
        }>;
    };
    discount: string;
    discount_book: number;
};

const ITEMS_PER_PAGE = 24;

const MainCatalog: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [isRatingChecked, setIsRatingChecked] = useState<boolean>(false);
    const [isDiscountChecked, setIsDiscountChecked] = useState<boolean>(false);
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE);

    const {
        data: books = [] as BookType[],
        isLoading: isBooksLoading,
        isError: isBooksError,
    } = useGetBooksQuery();

    const {
        data: discountBooks = [] as DiscountBookType[],
        isError: isDiscountError,
        isLoading: isDiscountLoading,
    } = useGetDiscountQuery();

    const {
        data: genres = [] as Genre[],
        isLoading: isGenresLoading,
        isError: isGenresError,
    } = useGetGenreQuery();

    const stars = [star0, star1, star2, star3, star4, star5];

    const handleAddToCart = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const calculateDiscountedPrice = (
        price: number,
        discount: number
    ): number => {
        const discountedPrice = price - (price * discount) / 100;
        return Math.ceil(discountedPrice / 10) * 10;
    };

    const transformedDiscountBooks: BookType[] = discountBooks.map(
        (discountBook) => ({
            id: discountBook.id,
            book_images: discountBook.books.book_images,
            book_name: discountBook.books.book_name,
            author: discountBook.books.author,
            price: Math.ceil(discountBook.books.price / 10) * 10,
            discount: parseFloat(discountBook.discount),
            description: discountBook.books.description,
            average_rating: discountBook.books.average_rating,
            total_ratings: discountBook.books.total_ratings,
            janre: discountBook.books.janre,
            isDiscountBook: true,
            originalBookId: discountBook.discount_book,
        })
    );

    const handleGenreClick = (genreName: string): void => {
        setSelectedGenre(selectedGenre === genreName ? null : genreName);
        setVisibleItems(ITEMS_PER_PAGE);
    };

    const handleMinPriceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = e.target.value === "" ? "" : Number(e.target.value);
        setMinPrice(value);
        setVisibleItems(ITEMS_PER_PAGE);
    };

    const handleMaxPriceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = e.target.value === "" ? "" : Number(e.target.value);
        setMaxPrice(value);
        setVisibleItems(ITEMS_PER_PAGE);
    };

    const toggleLike = (id: number): void => {
        setLikedItems((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    const handleRatingChange = (): void => {
        setIsRatingChecked(!isRatingChecked);
        setVisibleItems(ITEMS_PER_PAGE);
    };

    const handleDiscountChange = (): void => {
        setIsDiscountChecked(!isDiscountChecked);
        setVisibleItems(ITEMS_PER_PAGE);
    };

    const handleBookClick = (item: BookType): void => {
        if (item.isDiscountBook) {
            router.push(`/aksia/${item.id}`);
        } else {
            router.push(`/books/${item.id}`);
        }
    };

    const filteredBooks = (
        isDiscountChecked ? transformedDiscountBooks : books
    ).filter((book) => {
        const matchesGenre =
            !selectedGenre ||
            book.janre.some((genre) => genre.janre_name === selectedGenre);

        const bookPrice = book.isDiscountBook
            ? calculateDiscountedPrice(book.price, book.discount)
            : book.price;

        const matchesMinPrice = minPrice === "" || bookPrice >= minPrice;
        const matchesMaxPrice = maxPrice === "" || bookPrice <= maxPrice;

        const matchesRating = !isRatingChecked || book.average_rating >= 4;

        return (
            matchesGenre && matchesMinPrice && matchesMaxPrice && matchesRating
        );
    });
    const [isFilterActive, setIsFilterActive] = useState(false);

    const handleFilterClick = () => {
        setIsFilterActive(!isFilterActive);
    };
    const visibleBooks = filteredBooks.slice(0, visibleItems);
    const hasMoreBooks = visibleItems < filteredBooks.length;

    const loadMore = () => {
        setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
    };

    const resetAllFilters = (): void => {
        setSelectedGenre(null);
        setMinPrice("");
        setMaxPrice("");
        setIsRatingChecked(false);
        setIsDiscountChecked(false);
        setVisibleItems(ITEMS_PER_PAGE);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

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
                    <div
                        className={`${scss.filterBlock} ${
                            isFilterActive ? scss.filterBlockActive : ""
                        }`}
                    >
                        <div className={scss.genresBlock}>
                            <h1 className={scss.genreTitle}>Жанры</h1>
                            <div className={scss.genres}>
                                {genres?.map((genre) => (
                                    <h1
                                        key={genre.janre_name}
                                        className={`${scss.genre} ${
                                            selectedGenre === genre.janre_name
                                                ? scss.selectedGenre
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleGenreClick(genre.janre_name)
                                        }
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
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    min="0"
                                />
                                <input
                                    type="number"
                                    placeholder="до"
                                    className={scss.priceInput}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    min="0"
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
                            <div className={scss.navs}>
                                <Link href={"/"} className={scss.nav1}>
                                    Главная ›{" "}
                                </Link>
                                <Link href={"/catalog"} className={scss.nav2}>
                                    Каталог
                                    {selectedGenre && ` › ${selectedGenre}`}
                                </Link>
                            </div>
                            <button
                                onClick={resetAllFilters}
                                className={scss.filtButton}
                            >
                                ✕
                            </button>
                        </div>
                        <div className={scss.phoneTop}>
                            <Image
                                onClick={() => router.push("/")}
                                className={scss.backButton}
                                src={back}
                                alt="Back to home"
                                width={100}
                                height={100}
                                priority
                            />
                            <h1 className={scss.phoneTitle}>Каталог</h1>
                            <Image
                                className={scss.filterButton}
                                src={filter}
                                onClick={handleFilterClick}
                                alt="filter"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>
                        <div className={scss.hr}></div>
                        <div className={scss.cards}>
                            {visibleBooks.length > 0 ? (
                                <>
                                    {visibleBooks.map((item) => (
                                        <div
                                            key={item.id}
                                            className={scss.card}
                                        >
                                            <Image
                                                onClick={() =>
                                                    handleBookClick(item)
                                                }
                                                width={100}
                                                height={200}
                                                quality={80}
                                                className={scss.bookImage}
                                                src={
                                                    item.book_images[0]
                                                        ?.book_images ||
                                                    defaultBook
                                                }
                                                alt="Photo of book"
                                            />
                                            <div className={scss.cardInfo}>
                                                <div className={scss.rating}>
                                                    <Image
                                                        width={110}
                                                        height={20}
                                                        src={
                                                            stars[
                                                                item
                                                                    .average_rating
                                                            ] || star0
                                                        }
                                                        alt={`${
                                                            item.average_rating ||
                                                            0
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
                                                    {item.janre.map(
                                                        (janre, i) => (
                                                            <span
                                                                key={
                                                                    janre.janre_name
                                                                }
                                                                className={
                                                                    scss.janre
                                                                }
                                                            >
                                                                {
                                                                    janre.janre_name
                                                                }
                                                                {i <
                                                                    item.janre
                                                                        .length -
                                                                        1 &&
                                                                    ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </h1>
                                                <div className={scss.confirm}>
                                                    <h1 className={scss.price}>
                                                        <Image
                                                            width={20}
                                                            height={20}
                                                            src={price}
                                                            alt="price icon"
                                                        />
                                                        {item.isDiscountBook ? (
                                                            <>
                                                                {calculateDiscountedPrice(
                                                                    Math.ceil(
                                                                        item.price /
                                                                            10
                                                                    ) * 10,
                                                                    item.discount
                                                                )}
                                                                c
                                                                <span
                                                                    className={
                                                                        scss.originalPrice
                                                                    }
                                                                ></span>
                                                            </>
                                                        ) : (
                                                            `${
                                                                Math.ceil(
                                                                    item.price /
                                                                        10
                                                                ) * 10
                                                            }c`
                                                        )}
                                                        {item.discount > 0 && (
                                                            <span
                                                                className={
                                                                    scss.discount
                                                                }
                                                            >
                                                                -
                                                                {Math.round(
                                                                    item.discount
                                                                )}
                                                                %
                                                            </span>
                                                        )}
                                                    </h1>
                                                    <div
                                                        className={scss.actions}
                                                    >
                                                        <button
                                                            onClick={
                                                                handleAddToCart
                                                            }
                                                            className={
                                                                scss.button
                                                            }
                                                        >
                                                            В корзину
                                                        </button>
                                                        {showModal && (
                                                            <div
                                                                className={
                                                                    scss.modal
                                                                }
                                                            >
                                                                <p>
                                                                    Товар
                                                                    добавлен в
                                                                    корзину✓
                                                                </p>
                                                            </div>
                                                        )}
                                                        <button
                                                            className={
                                                                scss.buttonLike
                                                            }
                                                            onClick={() =>
                                                                toggleLike(
                                                                    item.id
                                                                )
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
                                    {hasMoreBooks && (
                                        <div className={scss.loadMoreContainer}>
                                            <button
                                                onClick={loadMore}
                                                className={scss.loadMoreButton}
                                            >
                                                Смотреть больше
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={scss.noResults}>
                                    <h1 className={scss.noResultsText}>
                                        По вашему запросу ничего не найдено.
                                        Попробуйте изменить параметры
                                        фильтрации.
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainCatalog;
