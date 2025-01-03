import React, { useEffect, useState } from "react";
import scss from "./Header.module.scss";
import logo from "@/assets/lofo.svg";
import Image from "next/image";
import SearchProducts from "@/shared/SearchProduct";
import Basket from "@/assets/Icons/clarity_shopping-bag-line.svg";
import like from "@/assets/Icons/like_icon.svg";
import Link from "next/link";
import BurgerButton from "@/ui/burgerButton/BurgerButton";
import BurgerMenu from "@/ui/burgerMenu/BurgerMenu";
import ProfileButton from "@/ui/profileButton/ProfileButton";
import ProfileMenu from "@/ui/profileMenu/ProfileMenu";
import { useRouter } from "next/navigation";
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
    icon: like,
    href: "/favorite",
  },
  {
    icon: Basket,
    href: "/basket",
  },
];
const Header = () => {
  const [isMobile, setIsMobile] = useState(true);
  const nav = useRouter();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1100);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={20}
                onClick={() => nav.push("/")}
              />
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
                    <ProfileButton />
                    <ProfileMenu />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <ProfileButton />
              <ProfileMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
