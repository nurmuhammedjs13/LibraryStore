"use client";
import Cookies from "js-cookie";
import { TbLogout2 } from "react-icons/tb";
import scss from "./ProfileMenu.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useGetMeQuery } from "@/redux/api/auth";
import Image from "next/image";
import Login from "@/appPages/auth/components/pages/login";
import { useState } from "react";
import SignUpPage from "@/appPages/auth/components/pages/SignUpPage";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileMenu = () => {
  const { isOpenProfileMenu } = useHeaderStore();
  const { status, data } = useGetMeQuery();
  const [isOpenAuth, setIsOpenAuth] = useState(true);
  const pathname = usePathname();
  const { isOpenBurgerMenu, setIsOpenBurgerMenu, links, linksIcon } =
    useHeaderStore();

  const userCookie = Cookies.get("user");
  const parsedUser = userCookie ? JSON.parse(userCookie) : null;

  const displayStatus = parsedUser ? "fulfilled" : status;

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refresh");
    Cookies.remove("user");
  };

  return (
    <div
      className={`${scss.ProfileMenu} ${isOpenProfileMenu ? scss.active : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={scss.content}>
        {displayStatus === "rejected" || !parsedUser ? (
          <>
            {!isOpenAuth ? (
              <Login setIsOpenAuth={setIsOpenAuth} />
            ) : (
              <SignUpPage setIsOpenAuth={setIsOpenAuth} />
            )}
          </>
        ) : (
          <>
            <div className={scss.user}>
              <div className={scss.user_cont}>
                {/* <Image
                  src={parsedUser?.user_image || "/default-avatar.png"}
                  alt={parsedUser?.username || "User"}
                  width={50}
                  height={50}
                  className={scss.avatar}
                /> */}
                <h2>{parsedUser?.username}</h2>
                <p>{parsedUser?.email}</p>
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
              <div className={scss.nav_right}>
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
              </div>
            </nav>
            <a
              href=""
              className={`${scss.logout} ${
                isOpenProfileMenu ? scss.active : ""
              }`}
              onClick={handleLogout}
            >
              <TbLogout2 />
              Выйти
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
