import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

          root.classList.add(systemTheme);
          set(() => ({ theme: theme }));
          return;
        }

        root.classList.add(theme);

        set(() => ({ theme: theme }));
      },
    }),

    {
      name: "pdv-blinking-lights-theme",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
