import { create } from "zustand";

type LanguageStore = {
  isKyrgyz: boolean;
  setIsKyrgyz: (isKyrgyz: boolean) => void;
  t: (ky: string, ru: string) => string;
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  isKyrgyz: true,
  setIsKyrgyz: (isKyrgyz: boolean) => set({ isKyrgyz }),
  t: (ky: string, ru: string) => (get().isKyrgyz ? ky : ru),
}));
