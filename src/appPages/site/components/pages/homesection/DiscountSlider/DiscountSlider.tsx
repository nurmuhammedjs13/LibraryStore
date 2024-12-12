"use client";
import React, { useEffect, useState } from "react";
import scss from "./DiscountSlider.module.scss";
import img from "../../../../../../assets/bookIMG.jpg";
import Image from "next/image";
import price from "../../../../../../assets/Icons/HomePrice.png";
import next from "../../../../../../assets/Icons/arrowButtonRight.png";
import preview from "../../../../../../assets/Icons/arrowButtonLeft.png";

interface Slide {
    books: {
        book_images: [
            {
                book_images: string;
            }
        ];
        book_name: string;
        price: number;
        author: string;

        average_rating: number;
        total_ratings: number;
        janre: [
            {
                janre_name: string;
            },
            {
                janre_name: string;
            }
        ];
    };
    discount: "50%";
    discount_book: 850.0;
}

const DiscountSlider = () => {
    const slides: Slide[] = [
        {
            books: {
                book_images: [
                    {
                        book_images:
                            "http://127.0.0.1:8000/media/book_images/photo_2024-11-24_16-56-47.jpg",
                    },
                ],
                book_name: "Гордость и предубеждение",
                price: 1700,
                author: "Абдуллах Накышчы",
                average_rating: 4.0,
                total_ratings: 1,
                janre: [
                    {
                        janre_name: "Романтика",
                    },
                    {
                        janre_name: "Драма",
                    },
                ],
            },
            discount: "50%",
            discount_book: 850.0,
        },
        {
            books: {
                book_images: [
                    {
                        book_images:
                            "http://127.0.0.1:8000/media/book_images/photo_2024-11-24_16-56-47.jpg",
                    },
                ],
                book_name: "Гордость и предубеждение",
                price: 1700,
                author: "Абдуллах Накышчы",
                average_rating: 4.0,
                total_ratings: 1,
                janre: [
                    {
                        janre_name: "Романтика",
                    },
                    {
                        janre_name: "Драма",
                    },
                ],
            },
            discount: "50%",
            discount_book: 850.0,
        },
        {
            books: {
                book_images: [
                    {
                        book_images:
                            "http://127.0.0.1:8000/media/book_images/photo_2024-11-24_16-56-47.jpg",
                    },
                ],
                book_name: "Гордость и предубеждение",
                price: 1700,
                author: "Абдуллах Накышчы",
                average_rating: 4.0,
                total_ratings: 1,
                janre: [
                    {
                        janre_name: "Романтика",
                    },
                    {
                        janre_name: "Драма",
                    },
                ],
            },
            discount: "50%",
            discount_book: 850.0,
        },
        {
            books: {
                book_images: [
                    {
                        book_images:
                            "http://127.0.0.1:8000/media/book_images/photo_2024-11-24_16-56-47.jpg",
                    },
                ],
                book_name: "Гордость и предубеждение",
                price: 1700,
                author: "Абдуллах Накышчы",
                average_rating: 4.0,
                total_ratings: 1,
                janre: [
                    {
                        janre_name: "Романтика",
                    },
                    {
                        janre_name: "Драма",
                    },
                ],
            },
            discount: "50%",
            discount_book: 850.0,
        },
        {
            books: {
                book_images: [
                    {
                        book_images:
                            "http://127.0.0.1:8000/media/book_images/photo_2024-11-24_16-56-47.jpg",
                    },
                ],
                book_name: "Гордость и предубеждение",
                price: 1700,
                author: "Абдуллах Накышчы",
                average_rating: 4.0,
                total_ratings: 1,
                janre: [
                    {
                        janre_name: "Романтика",
                    },
                    {
                        janre_name: "Драма",
                    },
                ],
            },
            discount: "50%",
            discount_book: 850.0,
        },
        {
            books: {
                book_images: [
                    {
                        book_images:
                            "http://127.0.0.1:8000/media/book_images/photo_2024-11-24_16-56-47.jpg",
                    },
                ],
                book_name: "Гордость и предубеждение",
                price: 1700,
                author: "Абдуллах Накышчы",
                average_rating: 4.0,
                total_ratings: 1,
                janre: [
                    {
                        janre_name: "Романтика",
                    },
                    {
                        janre_name: "Драма",
                    },
                ],
            },
            discount: "50%",
            discount_book: 850.0,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

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
                                        <Image
                                            className={scss.bookImg}
                                            width={220}
                                            height={300}
                                            src={img}
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
                                                        {slide.discount_book}
                                                    </h1>
                                                    <h1
                                                        className={
                                                            scss.previewPrice
                                                        }
                                                    >
                                                        {slide.books.price}
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
