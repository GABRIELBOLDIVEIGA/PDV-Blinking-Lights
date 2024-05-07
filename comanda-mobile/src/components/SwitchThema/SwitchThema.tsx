import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "@/context/Theme/useTheme";

const SwitchThema = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { setTheme, theme } = useTheme();
  const [isChecked, setIsChecked] = React.useState(
    theme === "light" ? false : true,
  );

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className,
      )}
      {...props}
      ref={ref}
      checked={isChecked}
      onClick={() => setIsChecked((prev) => !prev)}
      onCheckedChange={() => setTheme(isChecked ? "light" : "dark")}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none flex h-4 w-4 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:sr-only data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        )}
      >
        <Moon size={10} />
      </SwitchPrimitives.Thumb>
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none flex h-4 w-4 items-center justify-center rounded-full bg-background shadow-lg  ring-0 transition-transform data-[state=checked]:sr-only data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        )}
      >
        <SunMedium size={10} />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
SwitchThema.displayName = SwitchPrimitives.Root.displayName;

export { SwitchThema };
