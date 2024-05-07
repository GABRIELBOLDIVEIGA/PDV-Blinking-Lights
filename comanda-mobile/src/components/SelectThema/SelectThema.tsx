import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/Theme/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export const SelectThema = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex w-fit min-w-[10px] flex-col items-center bg-muted"
      >
        <DropdownMenuItem className="flex w-fit flex-col justify-between gap-4 bg-muted">
          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <div className="h-[20px] w-[20px] bg-white"></div>
          </div>

          <div
            className="flex rotate-45 overflow-hidden rounded-full hover:cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <div className="h-[20px] w-[20px] bg-black"></div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
