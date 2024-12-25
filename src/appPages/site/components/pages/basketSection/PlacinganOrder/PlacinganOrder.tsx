"use client";
import React, { useState } from "react";
import styles from "./PlacinganOrder.module.scss";
import img from "@/assets/welcome/landMark1.png";
import Image from "next/image";
import DeleteIcon from "@/assets/Icons/DeleteIcon";
import Minus from "@/assets/Icons/Minus";
import Plus from "@/assets/Icons/Plus";
import Price from "@/assets/Icons/Price";
import ImgStop from "@/assets/Icons/imgStop";

const PlacinganOrder = () => {
  const landmarkCard = [
    {
      img: img,
      name: "К себе нежно",
      author: "Ольга Примаченко",
      date: "30.11.2024",
      price: 400,
    },
  ];

  const [activeButton, setActiveButton] = useState<"delivery" | "pickup">(
    "delivery"
  );

  return (
    <div className={styles.mainBlock}>
      <div className="container">
        <div className={styles.block}>
          <div className={styles.landmark}>
            {landmarkCard.map((el, index) => (
              <div className={styles.cardBlock} key={index}>
                <div className={styles.ImgBlock}>
                  <div className={styles.img}>
                    <Image src={el.img} alt="img" />
                  </div>
                  <div className={styles.ImgText}>
                    <h2>{el.name}</h2>
                    <h3>{el.author}</h3>
                    <h4>{el.date}</h4>
                    <DeleteIcon />
                  </div>
                </div>
                <div className={styles.quantity}>
                  <Minus />
                  <h1>0</h1>
                  <Plus />
                </div>
                <div className={styles.price}>
                  <Price />
                  <h5>{el.price} сом</h5>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mainInput}>
            <h1>Оформление заказа</h1>
            <div className={styles.InputBlock}>
              <div className={styles.BlockBtn}>
                <button
                  className={`${styles.delivery} ${
                    activeButton === "delivery" ? styles.activeDelivery : ""
                  }`}
                  onClick={() => setActiveButton("delivery")}
                >
                  Доставка
                </button>
                <button
                  className={`${styles.pickup} ${
                    activeButton === "pickup" ? styles.activePickup : ""
                  }`}
                  onClick={() => setActiveButton("pickup")}
                >
                  Самовывоз
                </button>
              </div>
              <div className={styles.Inputs}>
                <div className={styles.Input}>
                  <h6>Имя</h6>
                  <input type="text" />
                  <hr />
                </div>
                <div className={styles.Input}>
                  <h6>Фамилия</h6>
                  <input type="text" />
                  <hr />
                </div>
                <div className={styles.Input}>
                  <h6>gmail</h6>
                  <input type="text" />
                  <hr />
                </div>
                <div className={styles.Input}>
                  <h6>Добавьте номер телефона</h6>
                  <input type="number" />
                  <hr />
                </div>
                {activeButton === "delivery" && (
                  <div className={styles.Input}>
                    <h6>Укажите адрес доставки</h6>
                    <input type="text" />
                    <hr />
                  </div>
                )}
                <div className={styles.Input}>
                  <h6>Комментарии к заказу</h6>
                  <input type="text" />
                  <hr />
                </div>
              </div>
              <div className={styles.uploadFile}>
                <div className={styles.text1}>
                  <h4>Товары: 4шт</h4>
                  <h4>2800 сом</h4>
                </div>
                <div className={styles.text2}>
                  <h4>Цену за доставку обговаривается с продавцом</h4>
                </div>
                <div className={styles.text3}>
                  <h3>Итого</h3>
                  <h3>2800 сом</h3>
                </div>
                <div className={styles.text4}>
                  <h2>Загрузите чек оплаты</h2>
                  <div className={styles.text5}>
                    <p>Реквизиты в шапке страницы</p>
                    <ImgStop />
                  </div>
                </div>
                <div className={styles.upload}>
                  <div className={styles.selectFile}>
                    <input type="file" />
                  </div>
                  <button>Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacinganOrder;
