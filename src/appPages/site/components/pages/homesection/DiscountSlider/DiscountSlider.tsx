"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useGetDiscountQuery } from "@/redux/api/discountSlider";
import scss from "./DiscountSlider.module.scss";
import Image from "next/image";
import like from "@/assets/Icons/like.png";
import likeActive from "@/assets/Icons/likeActive.png";
import priceIcon from "../../../../../../assets/Icons/HomePrice.png";
import nextIcon from "../../../../../../assets/Icons/arrowRight.png";
import prevIcon from "../../../../../../assets/Icons/arrowLeft.png";
import { useRouter } from "next/navigation";

type BookType = {
    book_name: string;
    author: string;
    price: number | string;
    book_images?: { book_images: string }[];
    average_rating?: number;
    total_ratings?: number;
    janre?: { janre_name: string }[];
};

type SlideType = {
    id: number;
    discount: string;
    discount_book: number | string;
    books: BookType;
};

interface SlideComponentProps {
    slide: SlideType;
    onAddToCart: () => void;
    isLiked: boolean;
    onLikeToggle: (id: number) => void;
}

const Slide: React.FC<SlideComponentProps> = ({
    slide,
    onAddToCart,
    isLiked,
    onLikeToggle,
}) => {
    const router = useRouter();
    const imageUrl =
        slide.books.book_images?.[0]?.book_images || "/default-image.jpg";

    const handleClick = () => {
        router.push(`/aksia/${slide.id}`);
    };

    return (
        <div className={scss.slide}>
            <h1 className={scss.discount_bage}>{slide.discount}</h1>
            <Image
                onClick={handleClick}
                className={scss.bookImg}
                width={220}
                height={300}
                src={imageUrl}
                alt={`Book: ${slide.books.book_name}`}
            />
            <div className={scss.info}>
                <div className={scss.infoBlock}>
                    <div className={scss.nameAndAuthor}>
                        <h1 className={scss.name}>{slide.books.book_name}</h1>
                        <h1 className={scss.author}>{slide.books.author}</h1>
                    </div>
                    <div className={scss.prices}>
                        <h1 className={scss.discountPrice}>
                            <Image
                                width={20}
                                height={20}
                                src={priceIcon}
                                alt="Discount Icon"
                            />
                            {Math.round(Number(slide.discount_book))} c
                        </h1>
                        <h1 className={scss.previewPrice}>
                            {Math.round(Number(slide.books.price))} c
                        </h1>
                    </div>
                </div>
                <div className={scss.action}>
                    <button onClick={onAddToCart} className={scss.button}>
                        В корзину
                    </button>
                    <button
                        className={scss.buttonLike}
                        onClick={() => onLikeToggle(Number(slide.id))}
                        aria-label={
                            isLiked
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        <Image
                            width={24}
                            className={scss.buttonLikeImg}
                            height={24}
                            src={isLiked ? likeActive : like}
                            alt={
                                isLiked
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DiscountSlider: React.FC = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [slideWidth, setSlideWidth] = useState(29.33);

    const {
        data: slides = [],
        isLoading,
        isError,
    } = useGetDiscountQuery(undefined, {
        selectFromResult: ({ data, isLoading, isError }) => ({
            data: data || [],
            isLoading,
            isError,
        }),
    });

    const updateSlideWidth = useCallback(() => {
        if (window.innerWidth <= 480) {
            setSlideWidth(98);
        } else if (window.innerWidth <= 740) {
            setSlideWidth(50);
        } else {
            setSlideWidth(33.33);
        }
    }, []);

    useEffect(() => {
        updateSlideWidth();
        window.addEventListener("resize", updateSlideWidth);
        return () => window.removeEventListener("resize", updateSlideWidth);
    }, [updateSlideWidth]);

    const handleLikeToggle = useCallback((id: number) => {
        setLikedItems((prevLikedItems) =>
            prevLikedItems.includes(id)
                ? prevLikedItems.filter((itemId) => itemId !== id)
                : [...prevLikedItems, id]
        );
    }, []);

    const nextSlide = useCallback(() => {
        if (!isAnimating && slides.length > 0) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }
    }, [isAnimating, slides.length]);

    const prevSlide = useCallback(() => {
        if (!isAnimating && slides.length > 0) {
            setIsAnimating(true);
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
            );
        }
    }, [isAnimating, slides.length]);

    const handleAddToCart = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    useEffect(() => {
        const autoSlide = setInterval(nextSlide, 3000);
        return () => clearInterval(autoSlide);
    }, [nextSlide]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const memoizedSlides = useMemo(
        () =>
            slides.map((slide) => (
                <Slide
                    key={slide.id}
                    slide={slide}
                    onAddToCart={handleAddToCart}
                    isLiked={likedItems.includes(slide.id)}
                    onLikeToggle={handleLikeToggle}
                />
            )),
        [slides, likedItems, handleLikeToggle]
    );

    if (isLoading)
        return (
            <div className={scss.loaderBlock}>
                <div className={scss.loader}></div>
            </div>
        );
    if (isError)
        return (
            <div className={scss.loaderBlock}>
                <div>Ошибка загрузки данных. Попробуйте позже.</div>
            </div>
        );

    return (
        <section className={scss.DiscountSlider}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>НАШИ СКИДКИ</h1>
                    {showModal && (
                        <div className={scss.modal}>
                            <p>Товар добавлен в корзину✓</p>
                        </div>
                    )}
                    <div className={scss.slider}>
                        <button
                            className={scss.prevButton}
                            onClick={prevSlide}
                            type="button"
                        >
                            <Image
                                width={90}
                                height={90}
                                src={prevIcon}
                                alt="Previous slide"
                            />
                        </button>
                        <div className={scss.sliderWrapper}>
                            <div
                                className={`${scss.slides} ${
                                    isAnimating ? scss.animate : ""
                                }`}
                                style={{
                                    transform: `translateX(-${
                                        (currentIndex % slides.length) *
                                        slideWidth
                                    }%)`,
                                }}
                            >
                                {memoizedSlides}
                            </div>
                        </div>
                        <button
                            className={scss.nextButton}
                            onClick={nextSlide}
                            type="button"
                        >
                            <Image
                                width={90}
                                height={90}
                                src={nextIcon}
                                alt="Next slide"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscountSlider;
