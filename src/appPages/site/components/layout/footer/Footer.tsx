"use client";
import React from "react";
import scss from "./Footer.module.scss";
import book from "@/assets/logoFooter copy.png";
import oku from "@/assets/footerOku.png";
import Image from "next/image";
import { useGetFooterQuery } from "@/redux/api/futer";
import Link from "next/link";

const shop = [
  {
    name: "Главная",
    href: "/",
  },
  {
    name: "Каталог",
    href: "/catalog",
  },
  {
    name: "Корзина",
    href: "/basket",
  },
  {
    name: "Избранное",
    href: "/favorite",
  },
];
const info = [
  {
    name: "Доставка",
    href: "deliver",
  },
  {
    name: "О нас ",
    href: "about-us",
  },
  {
    name: "Скидки",
    href: "sell",
  },
];
const Footer = () => {
  const { data } = useGetFooterQuery();
  const socialSite = data?.flatMap((el) => el.social_set.map((el) => el));
  return (
    <footer className={scss.footer}>
      <div className="container">
        <div className={scss.logo}>
          <Image src={book} alt="book" width={160} height={160} />
        </div>
        <div className={scss.content}>
          <div className={scss.top}>
            <div className={scss.shop}>
              <h1>Магазин</h1>
              {shop.map((el, idx) => (
                <Link key={idx} href={el.href}>
                  {el.name}
                </Link>
              ))}
            </div>
            <div className={scss.info}>
              <h1>Информация</h1>
              {info.map((el, idx) => (
                <Link key={idx} href={el.href}>
                  {el.name}
                </Link>
              ))}
            </div>
            <div className={scss.contact}>
              <h1>Контакты</h1>
              {data?.flatMap((el, idx) => (
                <React.Fragment key={idx}>
                  <a href="">{el.contact_info.map((el) => el.contact_info)}</a>
                  <a href="">{el.futer_email.map((el) => el.email_futer)}</a>
                </React.Fragment>
              ))}
            </div>
            <div className={scss.social}>
              <h1>Социальные сети</h1>
              <div className={scss.sites}>
                {socialSite?.map((el, idx) => (
                  <a key={idx} href={el.social_set}>
                    <Image
                      src={el.social_logo}
                      alt="lol"
                      width={48}
                      height={48}
                    />
                  </a>
                ))}
              </div>
              <div className={scss.adress}>
                {data?.flatMap((el, idx) => (
                  <a href="" key={idx}>
                    <span>Адрес</span>
                    <br />
                    <br />
                    {el.futer_address.map((el) => el.address)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={scss.bottom}>
            <div className={scss.map}>
              <iframe src="/map.html" frameBorder="0"></iframe>
            </div>
            <div className={scss.footOku}>
              <Image src={oku} alt="oku" width={920} height={190} />
            </div>
          </div>
          <div className={scss.copyright}>
            <p>Политика конфиденциальности</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
