import React from "react";
import styles from "./PlacinganOrder.module.scss";
import img from "@/assets/welcome/landMark1.png";
import Image from "next/image";
import DeleteIcon from "@/assets/Icons/DeleteIcon";
import Minus from "@/assets/Icons/Minus";
import Plus from "@/assets/Icons/Plus";
import Price from "@/assets/Icons/Price";

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
                  <Price/>
                  <h5>{el.price} сом</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacinganOrder;
