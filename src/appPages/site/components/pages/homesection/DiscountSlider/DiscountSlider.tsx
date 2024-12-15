"use client";
import React, { useEffect, useState } from "react";
import { useGetDiscountQuery } from "@/redux/api/discountSlider";
import scss from "./DiscountSlider.module.scss";
import Image from "next/image";
import priceIcon from "../../../../../../assets/Icons/HomePrice.png";
import nextIcon from "../../../../../../assets/Icons/arrowRight.png";
import prevIcon from "../../../../../../assets/Icons/arrowLeft.png";

type SlideType = {
    id: number;
    discount: string;
    discount_book: string;
    books: {
        book_name: string;
        author: string;
        price: string;
        book_images: { book_images: string }[];
    };
};

const Slide = ({ slide }: { slide: SlideType }) => {
    const imageUrl =
        slide.books.book_images?.[0]?.book_images || "/default-image.jpg";

    return (
        <div className={scss.slide}>
            <h1 className={scss.discount_bage}>{slide.discount}</h1>
            <Image
                className={scss.bookImg}
                width={220}
                height={300}
                src={imageUrl}
                alt="Book Image"
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
                            {Math.round(parseFloat(slide.discount_book))} c
                        </h1>
                        <h1 className={scss.previewPrice}>
                            {Math.round(parseFloat(slide.books.price))} c
                        </h1>
                    </div>
                </div>
                <div className={scss.action}>
                    <button className={scss.button}>В корзину</button>
                </div>
            </div>
        </div>
    );
};

const DiscountSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { data, isLoading, isError } = useGetDiscountQuery();
    const slides: SlideType[] = data || [];

    const nextSlide = () => {
        if (!isAnimating && slides.length > 0) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }
    };

    const prevSlide = () => {
        if (!isAnimating && slides.length > 0) {
            setIsAnimating(true);
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
            );
        }
    };

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(autoSlide);
    }, [slides.length]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Ошибка загрузки данных. Попробуйте позже.</div>;

    return (
        <section className={scss.DiscountSlider}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>НАШИ СКИДКИ</h1>
                    <div className={scss.slider}>
                        <button className={scss.prevButton} onClick={prevSlide}>
                            <Image
                                width={90}
                                height={90}
                                src={prevIcon}
                                alt="Prev Arrow"
                            />
                        </button>
                        <div className={scss.sliderWrapper}>
                            <div
                                className={`${scss.slides} ${
                                    isAnimating ? scss.animate : ""
                                }`}
                                style={{
                                    transform: `translateX(-${
                                        (currentIndex % slides.length) * 33.33
                                    }%)`,
                                }}
                            >
                                {slides.map((slide) => (
                                    <Slide key={slide.id} slide={slide} />
                                ))}
                            </div>
                        </div>
                        <button className={scss.nextButton} onClick={nextSlide}>
                            <Image
                                width={90}
                                height={90}
                                src={nextIcon}
                                alt="Next Arrow"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscountSlider;
