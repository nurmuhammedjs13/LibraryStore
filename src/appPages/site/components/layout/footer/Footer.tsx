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
  console.log("🚀 ~ Footer ~ data:", data);
  return (
    <footer className={scss.footer}>
      <div className={scss.book}>
        <Image src={book} alt="book" width={280} height={220} />
      </div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            {data?.flatMap((el, index) => (
              <div className={scss.left_logo} key={index}>
                <Image src={el.logo} alt="logo" width={240} height={60} />
                <a href="https://2gis.kg/bishkek/firm/70000001039504577?m=74.620386%2C42.869403%2F16">
                  {el.futer_address.map((el) => el.address)}
                </a>
                <a
                  href={`https://wa.me/${el.contact_info.map(
                    (el) => el.contact_info
                  )}`}
                >
                  {el.contact_info.map((el) => el.contact_info)}
                </a>
                <a href="">{el.futer_email.map((el) => el.email_futer)}</a>
              </div>
            ))}
          </div>
          <div className={scss.right}>
            <div className={scss.left_links}>
              {links.slice(0, 3).map((link, index) => (
                <Link key={index} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className={scss.right_links}>
              {links.slice(3, 6).map((link, index) => (
                <Link key={index} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className={scss.map}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
