import { create } from "zustand";
import Basket from "@/assets/Icons/clarity_shopping-bag-line.svg";
import profile from "@/assets/Icons/proicons_person.svg";
import like from "@/assets/Icons/like_icon.svg";

interface HeaderStore {
    links: {
        name: string;
        href: string;
    }[];
    linksIcon: {
        icon: string;
        href: string;
    }[];

    isOpenProfileMenu: boolean;
    setIsOpenProfileMenu: (isOpenProfileMenu: boolean) => void;

    isOpenBurgerMenu: boolean;
    setIsOpenBurgerMenu: (isOpenBurgerMenu: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
    links: [
        {
            name: "Главная",
            href: "/",
        },
        {
            name: "Каталог",
            href: "/catalog",
        },
        {
            name: "История Покупок",
            href: "/history",
        },
    ],
    linksIcon: [
        {
            icon: like,
            href: "/favorite",
        },
        {
            icon: Basket,
            href: "/basket",
        },
        // {
        //   icon: profile,
        //   href: "/profile",
        // },
    ],

    // login: () => {
    //   window.open(
    //     `${process.env.NEXT_PUBLIC_OKUKG_API}/accounts/login/`,
    //     "_self"
    //   );
    // },
    // logout: () => {
    //   window.open(
    //     `${process.env.NEXT_PUBLIC_OKUKG_API}/accounts/logout/`,
    //     "_self"
    //   );
    // },

    isOpenProfileMenu: false,
    setIsOpenProfileMenu: (isOpenProfileMenu) =>
        set(() => ({ isOpenProfileMenu: isOpenProfileMenu })),

    isOpenBurgerMenu: false,
    setIsOpenBurgerMenu: (isOpenBurgerMenu) =>
        set(() => ({ isOpenBurgerMenu: isOpenBurgerMenu })),
}));
