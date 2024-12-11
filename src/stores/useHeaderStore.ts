import { create } from "zustand";
import Basket from "@/assets/Icons/clarity_shopping-bag-line.svg";
import profile from "@/assets/Icons/proicons_person.svg";
interface HeaderStore {
  links: {
    name: string;
    href: string;
  }[];
  linksIcon: {
    icon: string;
    href: string;
  }[];
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
  ],
  linksIcon: [
    {
      icon: Basket,
      href: "/basket",
    },
    {
      icon: profile,
      href: "/profile",
    },
  ],
  isOpenBurgerMenu: false,
  setIsOpenBurgerMenu: (isOpenBurgerMenu) =>
    set(() => ({ isOpenBurgerMenu: isOpenBurgerMenu })),
}));
