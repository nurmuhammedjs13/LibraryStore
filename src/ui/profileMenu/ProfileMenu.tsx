"use client";
import Cookies from "js-cookie";
import { TbLogout2 } from "react-icons/tb";
import scss from "./ProfileMenu.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useGetMeQuery } from "@/redux/api/auth";
import Image from "next/image";
import Login from "@/appPages/auth/components/pages/login";
import { useState, useEffect } from "react";
import SignUpPage from "@/appPages/auth/components/pages/SignUpPage";
import { usePathname } from "next/navigation";
import Link from "next/link";
import userLogo from "@/assets/user.png";

const ProfileMenu = () => {
  const { isOpenProfileMenu } = useHeaderStore();
  const { status, data: userData } = useGetMeQuery();
  // console.log("🚀 ~ ProfileMenu ~ userData:", userData)
  const [isOpenAuth, setIsOpenAuth] = useState(true);
  const pathname = usePathname();
  const { isOpenBurgerMenu, setIsOpenBurgerMenu, links, linksIcon } =
    useHeaderStore();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refresh");
    Cookies.remove("user");
    window.location.reload(); // Обновление после выхода
  };

  const tokenExists = Boolean(Cookies.get("token")); // Проверяем наличие токена
  const isRejected = !tokenExists || status === "rejected"; // Определяем статус

  const parsedUser = userData || null;

  return (
    <div
      className={`${scss.ProfileMenu} ${isOpenProfileMenu ? scss.active : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {isRejected || !parsedUser ? (
        <>
          {isOpenAuth ? (
            <SignUpPage setIsOpenAuth={setIsOpenAuth} />
          ) : (
            <Login setIsOpenAuth={setIsOpenAuth} />
          )}
        </>
      ) : (
        <div className={scss.content}>
          <div className={scss.user}>
            <div className={scss.user_cont}>
              <h3>{parsedUser?.username}</h3>
              <Image
                src={parsedUser?.user_image || userLogo}
                alt={parsedUser?.username || "User"}
                width={70}
                height={70}
                className={scss.avatar}
              />
              <div className={scss.username}>
                <h2>{parsedUser?.username}</h2>
                <p>{parsedUser?.email}</p>
              </div>
            </div>
          </div>
          <nav className={scss.nav}>
            <ul>
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    className={
                      pathname === item.href
                        ? `${scss.link} ${scss.active}`
                        : scss.link
                    }
                    href={item.href}
                    onClick={() => setIsOpenBurgerMenu(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={scss.nav_right}>
              {linksIcon.map((icon, index) => (
                <Link
                  key={index}
                  className={
                    pathname === icon.href
                      ? `${scss.link} ${scss.active}`
                      : scss.link
                  }
                  href={icon.href}
                  onClick={() => setIsOpenBurgerMenu(false)}
                >
                  <Image src={icon.icon} alt="icon" width={35} height={35} />
                </Link>
              ))}
            </div>
          </nav>
          <a
            href=""
            className={`${scss.logout} ${isOpenProfileMenu ? scss.active : ""}`}
            onClick={handleLogout}
          >
            <TbLogout2 />
            Выйти
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
