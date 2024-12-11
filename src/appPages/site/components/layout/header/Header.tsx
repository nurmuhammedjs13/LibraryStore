import React, { useEffect, useState } from "react";
import scss from "./Header.module.scss";
import logo from "@/assets/lofo.svg";
import Image from "next/image";
import SearchProducts from "@/shared/SearchProduct";
import Basket from "@/assets/Icons/clarity_shopping-bag-line.svg";
import profile from "@/assets/Icons/proicons_person.svg";
import Link from "next/link";
import BurgerButton from "@/ui/burgerButton/BurgerButton";
import BurgerMenu from "@/ui/burgerMenu/BurgerMenu";
const Links = [
  {
    name: "Главная",
    href: "/",
  },
  {
    name: "Каталог",
    href: "/catalog",
  },
];
const LinkIcons = [
  {
    icon: Basket,
    href: "/basket",
  },
  {
    icon: profile,
    href: "/profile",
  },
];
const Header = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1100);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Image src={logo} alt="logo" width={100} height={20} />
            </div>
            <div className={scss.search}>
              <SearchProducts />
            </div>
          </div>
          {!isMobile ? (
            <>
              <div className={scss.right}>
                <div className={scss.navs}>
                  <div className={scss.nav_left}>
                    {Links.map((link, index) => (
                      <Link key={index} href={link.href}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className={scss.nav_right}>
                    {LinkIcons.map((icon, index) => (
                      <Link key={index} href={icon.href}>
                        <Image
                          src={icon.icon}
                          alt="icon"
                          width={35}
                          height={35}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <BurgerButton />
              <BurgerMenu />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
