import React from "react";
import styles from "./DeliveryInfo.module.scss";
import Link from "next/link";
import IconBreadcrumbs from "@/assets/Icons/IconBreatCrums";
import Image from "next/image";
import img1 from "@/assets/welcome/delivery1.png";
import img2 from "@/assets/welcome/delivery2.png";
import img3 from "@/assets/welcome/delivery3.png";

const DeliveryInfo = () => {
  const delivery = [
    {
      nameInformation: "Упаковка",
      textInformation:
        "Lorem ipsum dolor sit amet consectetur. Purus eget diam fringilla diam amet urna mi vulputate id. Velit commodo curabitur bibendum posuere eget purus cum tellus egestas. A massa adipiscing gravida neque suspendisse in enim convallis pulvinar. Semper integer libero viverra lorem amet eget. Tempus lacus ultrices massa gravida diam at in. Elementum ultricies diam sollicitudin vitae arcu fermentum. Proin quis sed luctus elit non ac tortor phasellus. Amet quis velit eu fermentum aliquam urna. Sem enim amet dignissim malesuada. Facilisis magna arcu sit posuere ut dui neque aliquet. Sem lobortis quis sit porttitor. Pulvinar eget et aliquam et.Lorem ipsum dolor sit amet consectetur. Purus eget diam fringilla diam amet urna mi vulputate id. Velit commodo curabitur bibendum posuere eget purus cum tellus egestas. A massa adipiscing gravida neque suspendisse in enim convallis pulvinar. Semper integer libero viverra lorem amet eget. Tempus lacus ultrices massa gravida diam at in. Elementum ultricies diam sollicitudin vitae arcu fermentum. Proin quis sed luctus elit non ac tortor phasellus.Amet quis velit eu fermentum aliquam urna. Sem enim amet dignissim malesuada. Facilisis magna arcu sit posuere ut dui neque aliquet. Sem lobortis quis sit porttitor. Pulvinar eget et aliquam et.",
    },
    {
      nameInformation: "Доставка",
      textInformation:
        "Lorem ipsum dolor sit amet consectetur. Purus eget diam fringilla diam amet urna mi vulputate id. Velit commodo curabitur bibendum posuere eget purus cum tellus egestas. A massa adipiscing gravida neque suspendisse in enim convallis pulvinar. Semper integer libero viverra lorem amet eget. Tempus lacus ultrices massa gravida diam at in. Elementum ultricies diam sollicitudin vitae arcu fermentum. Proin quis sed luctus elit non ac tortor phasellus. Amet quis velit eu fermentum aliquam urna. Sem enim amet dignissim malesuada. Facilisis magna arcu sit posuere ut dui neque aliquet. Sem lobortis quis sit porttitor. Pulvinar eget et aliquam et.Lorem ipsum dolor sit amet consectetur. Purus eget diam fringilla diam amet urna mi vulputate id. Velit commodo curabitur bibendum posuere eget purus cum tellus egestas. A massa adipiscing gravida neque suspendisse in enim convallis pulvinar. Semper integer libero viverra lorem amet eget. Tempus lacus ultrices massa gravida diam at in. Elementum ultricies diam sollicitudin vitae arcu fermentum. Proin quis sed luctus elit non ac tortor phasellus.Amet quis velit eu fermentum aliquam urna. Sem enim amet dignissim malesuada. Facilisis magna arcu sit posuere ut dui neque aliquet. Sem lobortis quis sit porttitor. Pulvinar eget et aliquam et.",
    },
  ];
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
            {delivery.map((el, index) => (
              <div key={index} className={styles.text}>
                <h2>{el.nameInformation}</h2>
                <p>{el.textInformation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
