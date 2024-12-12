"use client";
import React, { useState, useEffect } from "react";
import scss from "./Welcome.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetOpeningQuery } from "@/redux/api/opening";

const Tools = [
  { name: "КНИГИ" },
  { name: "КОФЕ" },
  { name: "КОНЦЕЛЯРСКИЕ ТОВАРЫ" },
];

const Welcome = () => {
  const nav = useRouter();
  const [index, setIndex] = useState(0);

  const { data, isLoading, isError } = useGetOpeningQuery();
  const Banners = data?.flatMap((el) => el.opening_images) || [];

  useEffect(() => {
    if (Banners.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [Banners.length]);

  const getBookClass = (bookIndex: number) => {
    if (Banners.length === 0) return "";
    if (bookIndex === index) return scss.center;
    if (bookIndex === (index + 1) % Banners.length) return scss.right;
    if (bookIndex === (index - 1 + Banners.length) % Banners.length)
      return scss.left;
    return "";
  };

  if (isLoading)
    return (
      <p
        style={{
          textAlign: "center",
        }}
      >
        Loading...
      </p>
    );
  if (isError)
    return (
      <p
        style={{
          textAlign: "center",
        }}
      >
        Error loading banners!
      </p>
    );

  return (
    <section className={scss.welcome}>
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
              <button onClick={() => nav.push("/allbooks")}>
                ПОСМОТРЕТЬ ВСЕ КНИГИ
              </button>
            </div>
          </div>

          <div className={scss.right}>
            {Banners.map((banner, idx) => (
              <div key={idx} className={`${scss.book} ${getBookClass(idx)}`}>
                {banner?.opening_images && (
                  <Image
                    src={banner.opening_images}
                    alt={`book-${idx}`}
                    width={280}
                    height={450}
                    priority
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
