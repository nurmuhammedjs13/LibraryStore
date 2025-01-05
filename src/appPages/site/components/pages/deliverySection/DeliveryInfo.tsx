"use client"
import React from "react";
import styles from "./DeliveryInfo.module.scss";
import Link from "next/link";
import IconBreadcrumbs from "@/assets/Icons/IconBreatCrums";
import Image from "next/image";
import img1 from "@/assets/welcome/delivery1.png";
import img2 from "@/assets/welcome/delivery2.png";
import img3 from "@/assets/welcome/delivery3.png";
import { useGetDostavkaQuery } from "@/redux/api/delivery";

const DeliveryInfo = () => {
  const {
    data,
    isLoading: IsGlobalLoading,
    isError: isGlobalError,
  } = useGetDostavkaQuery();

  const {
    data: deliveryData = [],
    isLoading: isLocalLoading,
    isError: isLocalError,
  } = useGetDostavkaQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data || [],
      isLoading,
      isError,
    }),
  });

  if (IsGlobalLoading || isLocalLoading) {
    return <>Loading...</>;
  }

  if (isGlobalError || isLocalError) {
    return <>Error</>;
  }

  return (
    <div className={styles.deliveryMain}>
      <div className="container">
        <div className={styles.delivery}>
          <div className={styles.breatCrums}>
            <h1>
              <Link href={"/"}>Главная</Link>
              <IconBreadcrumbs />
              <span>Доставка</span>
            </h1>
          </div>
          <div className={styles.deliveryBlock}>
            <h1>Доставка</h1>
            <Image className={styles.truck} src={img1} alt="img" />
            <div className={styles.imgBlock}>
              <Image className={styles.bigBox} src={img2} alt="img" />
              <Image className={styles.smallBox} src={img3} alt="img" />
            </div>
            {deliveryData.map((el, index) => (
              <div key={index} className={styles.text}>
                <h2>{el.name_information}</h2>
                <p>{el.text_information}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
