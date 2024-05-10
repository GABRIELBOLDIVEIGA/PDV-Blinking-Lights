import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CircleChevronRight } from "lucide-react";
import { menuOptions } from "./menu-options";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
          "flex flex-col w-full gap-2 pt-6 transition-transform duration-1000 ",
          {
            "": !isVisible,
          }
        )}
      >
        {menuOptions.map((option) => (
          <TooltipProvider key={option.text}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={option.link}
                  className={cn(
                    "[&.active]:font-bold [&.active]:opacity-100 opacity-50 [&.active]:bg-muted  w-full rounded-md px-4 py-2",
                    {
                      "bg-none [&.active]:bg-transparent": !isVisible,
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
              </TooltipTrigger>
              <TooltipContent
                className={cn("sr-only", {
                  "translate-x-10 translate-y-9 not-sr-only": !isVisible,
                })}
              >
                <p>{option.text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </menu>
  );
};
