import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";

import { Link } from "@tanstack/react-router";
import { CircleChevronRight } from "lucide-react";

export const Menu = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <menu
      className={cn(
        "w-[300px] transition-all duration-1000 flex flex-col items-center",
        {
          "w-[50px]": !isVisible,
        }
      )}
    >
      <div className="w-full text-right">
        <Button
          variant="ghost"
          size="icon"
          className={cn("transition-all duration-1000 mr-2")}
          onClick={() => {
            setIsVisible((prev) => !prev);
          }}
        >
          <CircleChevronRight
            className={cn("transition-all duration-500", {
              "rotate-180": isVisible,
            })}
          />
        </Button>
      </div>

      <div
        className={cn(
          "flex flex-col w-full gap-4 pt-16  transition-all duration-1000 px-4",
          {
            "w-0": !isVisible,
          }
        )}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Link
            key={i}
            to="/login"
            className={cn("[&.active]:font-bold [&.active]:bg-muted w-full", {
              "": !isVisible,
            })}
          >
            {i}
            {/* <div className={cn("ring rounded-md px-2")}>{i}</div> */}
          </Link>
        ))}
      </div>
    </menu>
  );
};
