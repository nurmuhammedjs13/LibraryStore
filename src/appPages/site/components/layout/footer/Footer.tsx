"use client";
import React from "react";
import scss from "./Footer.module.scss";
import book from "@/assets/image 33.png";
import Image from "next/image";
import { useGetFooterQuery } from "@/redux/api/futer";
import Link from "next/link";
const links = [
  {
    name: "Главная",
    href: "/",
  },
  {
    name: "Каталог",
    href: "/catalog",
  },
  {
    name: "Как заказать",
    href: "how-deliver",
  },
  {
    name: "Доставка",
    href: "/deliver",
  },
  {
    name: "О нас",
    href: "about-us",
  },
  {
    name: "Скидки",
    href: "cash-back",
  },
];
const Footer = () => {
  const { data } = useGetFooterQuery();
  const socialSite = data?.flatMap((el) => el.social_set.map((el) => el));
  return (
    <footer className={scss.footer}>
      <div className={scss.book}>
        <Image src={book} alt="book" width={280} height={220} />
      </div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.text_cont}>
            {data?.flatMap((el, idx) => (
              <div key={idx} className={scss.logo_Social}>
                <Image src={el.logo} alt="logo" width={150} height={30} />
                <div className={scss.soc_icons}>
                  {socialSite?.map((el, idx) => (
                    <Link href={el.social_set} key={idx}>
                      <Image
                        src={el.social_logo}
                        alt="logo"
                        width={48}
                        height={48}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className={scss.links}>
              {data?.flatMap((el, idx) => (
                <div className={scss.backLinks}>
                  <a key={idx}>{el.futer_address.map((el) => el.address)}</a>
                  <a key={idx}>
                    {el.contact_info.map((el) => el.contact_info)}
                  </a>
                  <a key={idx}>{el.futer_email.map((el) => el.email_futer)}</a>
                </div>
              ))}
              <div className={scss.left_links}>
                {links.slice(0, 3).map((el, idx) => (
                  <Link key={idx} href={el.href}>
                    {el.name}
                  </Link>
                ))}
              </div>
              <div className={scss.right_links}>
                {links.slice(3, 6).map((el, idx) => (
                  <Link key={idx} href={el.href}>
                    {el.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={scss.map}>
            <div className={scss.map_box}></div>
            <iframe src="/map.html" frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
