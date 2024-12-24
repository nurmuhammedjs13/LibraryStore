"use client";
import React from "react";
import styles from "./AboutUs.module.scss";
import img2 from "@/assets/welcome/aboutUs2.png";
import Image from "next/image";
import { useGetAboutUsQuery } from "@/redux/api/aboutUs";

const AboutUs = () => {
  const {
    data,
    isLoading: isGlobalLoading,
    isError: isGlobalError,
  } = useGetAboutUsQuery();

  const {
    data: aboutUsData = [],
    isLoading: isLocalLoading,
    isError: isLocalError,
  } = useGetAboutUsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data || [],
      isLoading,
      isError,
    }),
  });

  if (isGlobalLoading || isLocalLoading) {
    return <>Loading...</>;
  }

  if (isGlobalError || isLocalError) {
    return <>Error</>;
  }

  return (
    <section>
      <div className={styles.aboutUs}>
        <div className={styles.aboutUsBlock}>
          <h1>О НАС</h1>
          <div>
            {aboutUsData.map((el, index) => (
              <div key={index} className={styles.info}>
                <div className={styles.aboutUsImg}>
                  <Image
                    className={styles.image}
                    src={el.about_us_images}
                    alt="img"
                    width={1440}
                    height={100}
                  />
                  <div className={styles.text}>
                    <div className={styles.cardText}>
                      <h1>{el.name_site}</h1>
                      <p>{el.us_text}</p>
                    </div>
                    <div className={styles.AboutUsBox}>
                      <div className={styles.box}>
                        <h4>1000 + довольных клиентов</h4>
                      </div>
                      <div className={styles.box}>
                        <h4>Доступные цены</h4>
                      </div>
                    </div>
                    <div className={styles.bookShop}>
                      <Image
                        src={img2}
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
