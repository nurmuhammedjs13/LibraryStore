"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    useAddToCartMutation,
    useDeleteCartMutation,
    useGetCartItemsQuery,
} from "@/redux/api/addToCart";
import ReactDOM from "react-dom";

import { useGetMeQuery } from "@/redux/api/auth";
import nextIcon from "../../../../../../assets/Icons/arrowRight.png";
import prevIcon from "../../../../../../assets/Icons/arrowLeft.png";
import scss from "./DiscountSlider.module.scss";
import priceIcon from "../../../../../../assets/Icons/HomePrice.png";
import defaultBook from "@/assets/Icons/defaultBook.webp";
import { useGetDiscountQuery } from "@/redux/api/discountSlider";

type BookType = {
    id?: number;
    book_name: string;
    author: string;
    price: number;
    book_images?: { book_images: string }[];
};

type SlideType = {
    id?: number;
    discount: string;
    discount_book: number;
    books: BookType;
};

interface SlideProps {
    slide: SlideType;
}

const Slide: React.FC<SlideProps> = ({ slide }) => {
    const router = useRouter();
    const [isInCart, setIsInCart] = useState(false);
    const [cartModal, setCartModal] = useState(false);
    const imageUrl = slide.books.book_images?.[0]?.book_images || defaultBook;

    const { data: meData } = useGetMeQuery();
    const { data: cartData = [] } = useGetCartItemsQuery();
    const [addToCartMutation] = useAddToCartMutation();
    const [deleteCartItem] = useDeleteCartMutation();

    const userId = meData?.id || null;

    useEffect(() => {
        const cartItem = cartData.find(
            (item) => item.books.id === slide.books.id
        );
        setIsInCart(!!cartItem);
    }, [cartData, slide.books.id]);

    const handleClick = () => {
        router.push(`/aksia/${slide.id}`);
    };

    const renderModal = () => (
        <div className={scss.modal}>
            <p>Товар добавлен в корзину ✓</p>
        </div>
    );

    const handleToggleCart = async () => {
        if (!userId) {
            alert(
                "Пожалуйста, авторизуйтесь, чтобы добавлять книги в корзину."
            );
            return;
        }

        try {
            if (isInCart) {
                const cartItem = cartData.find(
                    (item) => item.id === slide.books.id
                );
                if (cartItem) {
                    await deleteCartItem(cartItem.id).unwrap();
                    setIsInCart(false);
                }
            } else {
                const requestBody = {
                    books: {
                        book_name: slide.books.book_name,
                        price: slide.discount_book,
                    },
                    quantity: 1,
                    books_id: slide.books.id,
                };
                await addToCartMutation(requestBody).unwrap();
                setIsInCart(true);
                setCartModal(true);
                setTimeout(() => setCartModal(false), 2000);
                console.log(requestBody, "req body");
            }
        } catch (error) {
            console.error("Ошибка изменения корзины:", error);
            alert("Произошла ошибка при работе с корзиной.");
        }
    };

    return (
        <>
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
                            <h1 className={scss.name}>
                                {slide.books.book_name}
                            </h1>
                            <h1 className={scss.author}>
                                {slide.books.author}
                            </h1>
                        </div>
                        <div className={scss.prices}>
                            <h1 className={scss.discountPrice}>
                                <Image
                                    width={20}
                                    height={20}
                                    src={priceIcon}
                                    alt="Discount Icon"
                                />
                                {Math.round(slide.discount_book)} c
                            </h1>
                            <h1 className={scss.previewPrice}>
                                {Math.round(slide.books.price)} c
                            </h1>
                        </div>
                    </div>
                    <div className={scss.action}>
                        <button
                            onClick={handleToggleCart}
                            className={scss.button}
                        >
                            {isInCart ? "В корзине" : "В корзину"}
                        </button>
                    </div>
                </div>
            </div>

            {cartModal && ReactDOM.createPortal(renderModal(), document.body)}
        </>
    );
};

const DiscountSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
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
        () => slides.map((slide) => <Slide key={slide.id} slide={slide} />),
        [slides]
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
        <section className={scss.DiscountSlider} id="sell">
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>НАШИ СКИДКИ</h1>
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
