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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Banners.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const getBookClass = (bookIndex: number) => {
    if (bookIndex === index) return scss.center; 
    if (bookIndex === (index + 1) % Banners.length) return scss.right; 
    if (bookIndex === (index - 1 + Banners.length) % Banners.length)
      return scss.left; 
    return ""; 
  };
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
            {Banners.map((banner, idx) => (
              <div key={idx} className={`${scss.book} ${getBookClass(idx)}`}>
                <Image
                  src={banner.img}
                  alt={banner.alt}
                  width={280}
                  height={450}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
