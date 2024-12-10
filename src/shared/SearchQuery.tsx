"use client";
import React, { useEffect, useState } from "react";
import scss from "./SearchQuery.module.scss";

const SearchQuery = () => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const loadingText = "Ваш запрос в деле".split(""); // Разбиваем текст на отдельные символы

  return (
    <div className={scss.SearchQuery}>
      <div className={scss.container}>
        <div className={scss.content}>
          {/* <p className={scss.loadingText}>
            {loadingText.map((letter, index) => (
              <span
                key={index}
                className={scss.jump}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
            {dots}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SearchQuery;
