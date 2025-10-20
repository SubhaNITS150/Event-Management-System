import { create } from "zustand";

export const useViewportStore = create((set) => ({
  isMobile: window.innerWidth <= 768,
  setIsMobile: (value) => set({ isMobile: value }),
}));