"use client";
import React from "react";
import styles from "./AboutUs.module.scss";
import img1 from "@/assets/welcome/aboutUs1.png";
import img2 from "@/assets/welcome/aboutUs2.png";
import Image from "next/image";

const AboutUs = () => {
  const aboutUs = [
    {
      img1: img1,
      name: "OKU.KG",
      text1:
        "Lorem ipsum dolor sit amet consectetur. Purus eget diam fringilla diam amet urna mi vulputate id. Velit commodo curabitur bibendum posuere eget purus cum tellus egestas. A massa adipiscing gravida neque suspendisse in enim convallis pulvinar. Semper integer libero viverra lorem amet eget. Tempus lacus ultrices massa gravida diam at in. Elementum ultricies diam sollicitudin vitae arcu fermentum. Proin quis sed luctus elit non ac tortor phasellus.Amet quis velit eu fermentum aliquam urna. Sem enim amet dignissim malesuada. Facilisis magna arcu sit posuere ut dui neque aliquet. Sem lobortis quis sit porttitor. Pulvinar eget et aliquam et.",
      img2: img2,
    },
  ];
  return (
    <section id="about-us">
      <div className={styles.aboutUs}>
        <div className={styles.aboutUsBlock}>
          <h1>О НАС</h1>
          <div>
            {aboutUs.map((el, index) => (
              <div key={index} className={styles.info}>
                <div className={styles.aboutUsImg}>
                  <Image className={styles.image} src={el.img1} alt="img" />
                  <div className={styles.text}>
                    <div className={styles.cardText}>
                      <h1>{el.name}</h1>
                      <p>{el.text1}</p>
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
                      <Image src={el.img2} alt="img" />
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
