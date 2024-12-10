"use client";
import React, { useState, useEffect } from "react";
import scss from "./Welcome.module.scss";
import book from "@/assets/welcome/image 18.jpg";
import book1 from "@/assets/welcome/image 20.jpg";
import book2 from "@/assets/welcome/image 25.jpg";
import book3 from "@/assets/welcome/image 23.jpg";
import book4 from "@/assets/welcome/image 21.jpg";
import Image from "next/image";

const Tools = [
  { name: "КНИГИ" },
  { name: "КОФЕ" },
  { name: "КОНЦЕЛЯРСКИЕ ТОВАРЫ" },
];

const Banners = [
  { img: book, alt: "book1" },
  { img: book1, alt: "book2" },
  { img: book2, alt: "book3" },
  { img: book3, alt: "book4" },
  { img: book4, alt: "book5" },
];

const Welcome = () => {
  const [visibleBooks, setVisibleBooks] = useState(Banners.slice(0, 3));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Переход к следующему индексу
      setIndex((prevIndex) => (prevIndex + 1) % Banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Обновление видимых книг
    const newBooks = [
      Banners[index],
      Banners[(index + 1) % Banners.length],
      Banners[(index + 2) % Banners.length],
    ];
    setVisibleBooks(newBooks);
  }, [index]);

  return (
    <div className={scss.welcome}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.text}>
              <p>Пополни свою книжную полку новыми книгами</p>
            </div>
            <div className={scss.tools}>
              {Tools.map((tool, idx) => (
                <a key={idx}>{tool.name}</a>
              ))}
            </div>
            <div className={scss.button}>
              <button>ПОСМОТРЕТЬ ВСЕ КНИГИ</button>
            </div>
          </div>
          <div className={scss.right}>
            {visibleBooks.map((banner, idx) => (
              <Image
                key={idx}
                className={`${scss.book} ${idx === 1 ? scss.center : ""}`}
                src={banner.img}
                alt={banner.alt}
                width={280}
                height={490}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
