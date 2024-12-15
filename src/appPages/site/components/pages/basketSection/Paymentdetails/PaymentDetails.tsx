"use client";
import React from "react";
import styles from "./PaymentDetails.module.scss";
import QrCode from "@/assets/welcome/QRCode.png";
import Image from "next/image";
import QrCode2 from "@/assets/welcome/QRCode2.png";
import MBANK from "@/assets/welcome/MBANK.png";
import DEMIR from "@/assets/welcome/DEMIR.png";
import OPTIMABANK from "@/assets/welcome/OPTIMABANK.png";
import Link from "next/link";

const PaymentDetails = () => {
  const Details = [
    {
      nameImg: MBANK,
      img: QrCode,
      Check: "хххххххххххх",
    },
    {
      nameImg: DEMIR,
      img: QrCode2,
      Check: "хххххххххххх",
    },
    {
      nameImg: OPTIMABANK,
      img: QrCode2,
      Check: "хххххххххххх",
    },
  ];
  return (
    <div className={styles.detailsMain}>
      <div className={styles.details}>
        <div className="container">
          <div className={styles.breatCrums}>
            <h3><Link href="/">Главная </Link><span>/ Корзина</span></h3>
          </div>
        </div>

        <div className={styles.detailsBlock}>
          <div className="container">
            <h2>Реквизиты для оплаты</h2>
            <div className={styles.chek}>
              {Details.map((el, index) => (
                <div key={index} className={styles.detailsBox}>
                  <Image  src={el.nameImg} alt="img" />
                  <Image className={styles.QrCode} src={el.img} alt="img" />
                  <h2>Счет:{el.Check}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
