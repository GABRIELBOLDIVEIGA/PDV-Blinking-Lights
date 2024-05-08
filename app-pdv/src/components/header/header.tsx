import { cn } from "@/lib/utils";
import { SwitchTheme } from "../switch-theme/switch-theme";

interface IProps {
  className?: string;
}

export const Header = ({ className }: IProps) => {
  return (
    <header
      className={cn(
        "p-4 border-b flex justify-between items-center sticky z-50",
        className
      )}
    >
      <p className="w-fit">Header</p>

      <SwitchTheme />
    </header>
  );
};
