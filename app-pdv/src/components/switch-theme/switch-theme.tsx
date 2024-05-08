import { useThemeStore } from "@/stores/theme.store";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export const SwitchTheme = ({ className }: IProps) => {
  const theme = useThemeStore((store) => store.theme);
  const setTheme = useThemeStore((store) => store.setTheme);

  return (
    <Switch
      className={cn("", className)}
      checked={theme === "dark" ? true : false}
      onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};
