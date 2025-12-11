"use client";

import React, { useEffect, useState } from "react";
import scss from "./Header.module.scss";
import logo from "@/assets/lofo.svg";
import Image from "next/image";
import SearchProducts from "@/shared/SearchProduct";
import Basket from "@/assets/Icons/clarity_shopping-bag-line.svg";
import like from "@/assets/Icons/like_icon.svg";
import Link from "next/link";
import ProfileButton from "@/ui/profileButton/ProfileButton";
import ProfileMenu from "@/ui/profileMenu/ProfileMenu";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/auth";
import Cookies from "js-cookie";
import { useHeaderStore } from "@/stores/useHeaderStore";

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

const Header = () => {
    const { status, data: userData } = useGetMeQuery();
    const [isMobile, setIsMobile] = useState(true);
    const nav = useRouter();
    const tokenExists = Boolean(Cookies.get("token"));
    const isRejected = !tokenExists || status === "rejected";

    const parsedUser = userData || null;
    const { isOpenProfileMenu, setIsOpenProfileMenu } = useHeaderStore();

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
                                    {tokenExists && status === "fulfilled" ? (
                                        <Link href="/favorite">
                                            <Image
                                                src={like}
                                                alt="icon"
                                                width={35}
                                                height={35}
                                            />
                                        </Link>
                                    ) : (
                                        <Link
                                            href=""
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpenProfileMenu(
                                                    !isOpenProfileMenu
                                                );
                                            }}
                                        >
                                            <Image
                                                src={like}
                                                alt="icon"
                                                width={35}
                                                height={35}
                                            />
                                        </Link>
                                    )}
                                    {tokenExists && status === "fulfilled" ? (
                                        <Link href="/basket">
                                            <Image
                                                src={Basket}
                                                alt="icon"
                                                width={35}
                                                height={35}
                                            />
                                        </Link>
                                    ) : (
                                        <Link
                                            href=""
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpenProfileMenu(
                                                    !isOpenProfileMenu
                                                );
                                            }}
                                        >
                                            <Image
                                                src={Basket}
                                                alt="icon"
                                                width={35}
                                                height={35}
                                            />
                                        </Link>
                                    )}
                                    <ProfileButton />
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
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
