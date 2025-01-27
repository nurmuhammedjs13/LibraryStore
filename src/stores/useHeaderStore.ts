import { create } from "zustand";
import Basket from "@/assets/Icons/clarity_shopping-bag-line.svg";
import profile from "@/assets/Icons/proicons_person.svg";
import like from "@/assets/Icons/like_icon.svg";

interface HeaderStore {
  links: {
    name: string;
    href: string;
  }[];

  isOpenProfileMenu: boolean;
  setIsOpenProfileMenu: (isOpenProfileMenu: boolean) => void;
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
    {
      name: "Избранное",
      href: "/favorite",
    },
    {
      name: "Корзина",
      href: "/basket",
    },
    {
      name: "Xотите сбросить пароль",
      href: "/forgot",
    },
  ],

  isOpenProfileMenu: false,
  setIsOpenProfileMenu: (isOpenProfileMenu) =>
    set(() => ({ isOpenProfileMenu: isOpenProfileMenu })),
}));
