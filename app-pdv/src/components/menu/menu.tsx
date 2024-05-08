import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CircleChevronRight } from "lucide-react";
import { menuOptions } from "./menu-options";

export const Menu = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <menu
      className={cn(
        "w-[300px] transition-all duration-1000 flex flex-col items-center border-r",
        {
          "w-[50px]": !isVisible,
        }
      )}
    >
      <div className="w-full text-right">
        <Button
          variant="ghost"
          size="icon"
          className={cn("transition-transform duration-1000 mr-2 mt-3")}
          onClick={() => {
            setIsVisible((prev) => !prev);
          }}
        >
          <CircleChevronRight
            className={cn("transition-transform duration-500", {
              "rotate-180": isVisible,
            })}
          />
        </Button>
      </div>

      <div
        className={cn(
          "flex flex-col w-full gap-4 pt-6 transition-transform duration-1000 px-4",
          {
            "": !isVisible,
          }
        )}
      >
        {menuOptions.map((option) => (
          <Link
            key={option.text}
            to={option.link}
            className={cn(
              "[&.active]:font-bold [&.active]:opacity-100 opacity-80 [&.active]:bg-muted w-full rounded-md py-1",
              {
                "": !isVisible,
              }
            )}
          >
            <div
              className={cn(
                "flex gap-2 justify-start translate-x-0 transition-transform duration-1000",
                {
                  "-translate-x-1": !isVisible,
                }
              )}
            >
              <div>{option.icon}</div>

              <p className="truncate">{option.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </menu>
  );
};
