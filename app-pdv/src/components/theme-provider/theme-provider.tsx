import { useThemeStore } from "@/stores/theme.store";
import { useEffect } from "react";

export const ThemeProvider = () => {
  const setTheme = useThemeStore((state) => state.setTheme);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="sr-only">
      <p>Componente responsável para o prover o tema da aplicação.</p>
    </section>
  );
};
