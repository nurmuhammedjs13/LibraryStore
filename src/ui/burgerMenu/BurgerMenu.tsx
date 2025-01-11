import React from "react";
import scss from "./BurgerMenu.module.scss";
import Link from "next/link";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ProfileButton from "../profileButton/ProfileButton";
import ProfileMenu from "../profileMenu/ProfileMenu";

const BurgerMenu = () => {
  const pathname = usePathname();
  const { isOpenBurgerMenu, setIsOpenBurgerMenu, links,  } =
    useHeaderStore();

  return (
    <>
      <div
        className={
          isOpenBurgerMenu
            ? `${scss.BurgerMenu} ${scss.active}`
            : `${scss.BurgerMenu}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={scss.content}>
          <div className={scss.logo}>
            <h1>Oku.kg</h1>
          </div>
          <nav className={scss.nav}>
            <ul>
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    className={
                      pathname === item.href
                        ? `${scss.link} ${scss.active}`
                        : `${scss.link}`
                    }
                    href={item.href}
                    onClick={() => setIsOpenBurgerMenu(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* <div className={scss.nav_right}>
              {linksIcon.map((icon, index) => (
                <Link
                  key={index}
                  className={
                    pathname === icon.href
                      ? `${scss.link} ${scss.active}`
                      : `${scss.link}`
                  }
                  href={icon.href}
                  onClick={() => setIsOpenBurgerMenu(false)}
                >
                  <Image src={icon.icon} alt="icon" width={35} height={35} />
                </Link>
              ))}
              <ProfileButton />
              <ProfileMenu />
            </div> */}
          </nav>
        </div>
      </div>
    </>
  );
};
export default BurgerMenu;
