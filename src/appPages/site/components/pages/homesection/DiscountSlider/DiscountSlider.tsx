"use client";

import React, { useEffect, useState } from "react";
import { useGetDiscountQuery } from "@/redux/api/discountSlider";
import scss from "./DiscountSlider.module.scss";
import img from "../../../../../../assets/bookIMG.jpg";
import Image from "next/image";
import price from "../../../../../../assets/Icons/HomePrice.png";
import next from "../../../../../../assets/Icons/arrowRight.png";
import preview from "../../../../../../assets/Icons/arrowLeft.png";

const DiscountSlider = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const { data, isLoading, isError } = useGetDiscountQuery();

    const slides = data || [];
    const nextSlide = (): void => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex: number): number => {
                return (prevIndex + 1) % slides.length;
            });
        }
    };
    const prevSlide = (): void => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex: number): number => {
                return (prevIndex - 1 + slides.length) % slides.length;
            });
        }
    };

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(autoSlide);
    }, []);
    useEffect(() => {
        const timer: NodeJS.Timeout = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Ошибка загрузки данных. Попробуйте позже.</div>;

    return (
        <section className={scss.DiscountSlider} id="sell">
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>НАШИ СКИДКИ</h1>
                    <div className={scss.slider}>
                        <button className={scss.prevButton} onClick={prevSlide}>
                            <Image
                                width={90}
                                height={90}
                                src={preview}
                                alt="arrow"
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
                                {slides.map((slide, index) => (
                                    <div key={index} className={scss.slide}>
                                        <h1 className={scss.discount_bage}>
                                            {slide.discount}
                                        </h1>
                                        <Image
                                            className={scss.bookImg}
                                            width={220}
                                            height={300}
                                            src={
                                                slide.books.book_images[0]
                                                    .book_images
                                            }
                                            alt=""
                                        />
                                        <div className={scss.info}>
                                            <div className={scss.infoBlock}>
                                                <div
                                                    className={
                                                        scss.nameAndAuthor
                                                    }
                                                >
                                                    <h1 className={scss.name}>
                                                        {slide.books.book_name}
                                                    </h1>
                                                    <h1 className={scss.author}>
                                                        {slide.books.author}
                                                    </h1>
                                                </div>
                                                <div className={scss.prices}>
                                                    <h1
                                                        className={
                                                            scss.discountPrice
                                                        }
                                                    >
                                                        <Image
                                                            width={20}
                                                            height={20}
                                                            src={price}
                                                            alt="discount icon"
                                                        />
                                                        {slide.discount_book} c
                                                    </h1>
                                                    <h1
                                                        className={
                                                            scss.previewPrice
                                                        }
                                                    >
                                                        {slide.books.price} c
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className={scss.action}>
                                                <button className={scss.button}>
                                                    В корзину
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className={scss.nextButton} onClick={nextSlide}>
                            <Image
                                width={90}
                                height={90}
                                src={next}
                                alt="arrow"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscountSlider;
