import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("my-theme") || "retro",
    setTheme: (theme) => {
      localStorage.setItem("my-theme", theme);
      document.documentElement.setAttribute("data-theme", theme); // Apply theme globally
      set({ theme });
    },
  }));
  