import React from "react";
import styles from "./HistoryOrder.module.scss";
import Link from "next/link";
import IconBreadcrumbs from "@/assets/Icons/IconBreatCrums";
import img1 from "@/assets/welcome/history.png";
import Image from "next/image";
import Price from "@/assets/Icons/Price";
const HistoryOrder = () => {
  const history = [
    {
      delivery: "Самовывоз",
      date: "25.10.2024",
      books: [
        {
          image: img1,
          bookName: "К себе нежно",
          author: "Ольга Примаченко",
          price: 900,
          quantity: 2,
          totalSumByQuantity: 1800,
        },
        {
          image: img1,
          bookName: "Мать верующих",
          author: "Сулейман Ан-Надви",
          price: 800,
          quantity: 1,
          totalSumByQuantity: 800,
        },
      ],
    },
    {
      delivery: "Доставка",
      date: "26.10.2024",
      books: [
        {
          image: img1,
          bookName: "К себе нежно",
          author: "Ольга Примаченко",
          price: 1200,
          quantity: 10,
          totalSumByQuantity: 12000,
        },
        {
          image: img1,
          bookName: "Мать верующих",
          author: "Сулейман Ан-Надви",
          price: 800,
          quantity: 3,
          totalSumByQuantity: 2400,
        },
      ],
    },
    {
      delivery: "Доставка",
      date: "26.10.2024",
      books: [
        {
          image: img1,
          bookName: "К себе нежно",
          author: "Ольга Примаченко",
          price: 1200,
          quantity: 10,
          totalSumByQuantity: 12000,
        },
        {
          image: img1,
          bookName: "Мать верующих",
          author: "Сулейман Ан-Надви",
          price: 800,
          quantity: 3,
          totalSumByQuantity: 2400,
        },
      ],
    },
    {
      delivery: "Самовывоз",
      date: "26.10.2024",
      books: [
        {
          image: img1,
          bookName: "К себе нежно",
          author: "Ольга Примаченко",
          price: 1200,
          quantity: 10,
          totalSumByQuantity: 12000,
        },
        {
          image: img1,
          bookName: "Мать верующих",
          author: "Сулейман Ан-Надви",
          price: 800,
          quantity: 3,
          totalSumByQuantity: 2400,
        },
        {
          image: img1,
          bookName: "Мать верующих",
          author: "Сулейман Ан-Надви",
          price: 800,
          quantity: 3,
          totalSumByQuantity: 2400,
        },
      ],
    },
  ];
  return (
    <div className={styles.history}>
      <div className="container">
        <div className={styles.historyBlock}>
          <div className={styles.breatCrums}>
            <h1>
              <Link href={"/"}>Главная</Link>
              <IconBreadcrumbs />
              <span>История заказов</span>
            </h1>
          </div>
          <div className={styles.mainBlock}>
            {history.map((item, index) => (
              <div key={index} className={styles.block}>
                <div className={styles.dateDelivery}>
                  <h3>{item.delivery}</h3>
                  <h3>{item.date}</h3>
                </div>
                {item.books.map((el, index) => (
                  <div className={styles.cardMain} key={index}>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardImg}>
                        <div className={styles.imageInfo}>
                          <Image src={el.image} alt="img" />
                        </div>
                        <div className={styles.textImg}>
                          <h2>{el.bookName}</h2>
                          <h3>{el.author}</h3>
                          <h4>
                            {" "}
                            <Price /> {el.price}
                          </h4>
                        </div>
                      </div>
                      <div className={styles.priceBlock}>
                        <h5>Кол-во: {el.quantity} шт</h5>
                        <h6>Итого: {el.totalSumByQuantity} сом</h6>
                      </div>
                    </div>
                    <div className={styles.blockHr}>
                      <hr />
                    </div>
                  </div>
                ))}
                <div className={styles.TotalPrice}>
                  <h1>Итого</h1>
                  <p>2900 сом</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
