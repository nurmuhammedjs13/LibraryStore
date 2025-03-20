"use client";

import React from "react";
import styles from "./HistoryOrder.module.scss";
import Link from "next/link";
import IconBreadcrumbs from "@/assets/Icons/IconBreatCrums";
import Image from "next/image";
import Price from "@/assets/Icons/Price";
import { useGetHistoryQuery } from "@/redux/api/history";

const HistoryOrder = () => {
    const { data: history = [], isLoading, isError } = useGetHistoryQuery();
    console.log(history, "history");

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
                    {isLoading ? (
                        <div>Загрузка...</div>
                    ) : isError ? (
                        <div>Произошла ошибка при загрузке истории заказов</div>
                    ) : (
                        <div className={styles.mainBlock}>
                            {history.map((item, index) => (
                                <div key={index} className={styles.block}>
                                    <div className={styles.dateDelivery}>
                                        <h3>{item.order.delivery}</h3>
                                        <h3>{item.order.created_at}</h3>
                                    </div>
                                    {item.order.books.map((el, idx) => (
                                        <div
                                            className={styles.cardMain}
                                            key={idx}
                                        >
                                            <div className={styles.cardInfo}>
                                                <div className={styles.cardImg}>
                                                    <div
                                                        className={
                                                            styles.textImg
                                                        }
                                                    >
                                                        <h2>{el.book_name}</h2>
                                                        <h3>{el.author}</h3>
                                                        <h4>
                                                            <Price /> {el.price}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.priceBlock
                                                    }
                                                >
                                                    <h5>
                                                        Кол-во: {el.quantity} шт
                                                    </h5>
                                                    <h6>
                                                        Итого:{" "}
                                                        {el.price * el.quantity}{" "}
                                                        сом
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className={styles.blockHr}>
                                                <hr />
                                            </div>
                                        </div>
                                    ))}
                                    <div className={styles.TotalPrice}>
                                        <h1>Итого</h1>
                                        <p>{item.order.total_price} сом</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryOrder;
