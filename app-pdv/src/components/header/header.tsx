import { SwitchTheme } from "../switch-theme/switch-theme";

export const Header = () => {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <p className="w-fit">Header</p>

      <SwitchTheme />
    </header>
  );
};
