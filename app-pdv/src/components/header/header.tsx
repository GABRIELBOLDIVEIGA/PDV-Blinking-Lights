import { cn } from "@/lib/utils";
import { SwitchTheme } from "../switch-theme/switch-theme";
import { useRouterState } from "@tanstack/react-router";

interface IProps {
  className?: string;
}

export const Header = ({ className }: IProps) => {
  const router = useRouterState();

  return (
    <header
      className={cn(
        "p-4 border-b flex justify-between items-center sticky z-50",
        className
      )}
    >
      <p className="w-fit capitalize">
        {router.location.pathname.replace("/", "")}
      </p>

      <SwitchTheme />
    </header>
  );
};
