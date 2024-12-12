"use client";
import React, { useEffect, useState } from "react";
import scss from "./DiscountSlider.module.scss";
import img from "../../../../../../assets/bookIMG.jpg";
import Image from "next/image";
import next from "../../../../../../assets/Icons/arrowButtonRight.png";
import preview from "../../../../../../assets/Icons/arrowButtonLeft.png";

interface Slide {
    id: number;
    image: typeof img;
}

const DiscountSlider = () => {
    const slides: Slide[] = [
        { id: 1, image: img },
        { id: 2, image: img },
        { id: 3, image: img },
        { id: 4, image: img },
        { id: 5, image: img },
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
                                {slides.map((slide: Slide) => (
                                    <div key={slide.id} className={scss.slide}>
                                        <Image
                                            width={100}
                                            height={180}
                                            src={img}
                                            alt={`Slide ${slide.id}`}
                                        />
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
