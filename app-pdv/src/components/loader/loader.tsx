import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ILoader {
  size?: number;
  className?: string;
  children?: JSX.Element;
  isPending?: boolean;
}

export const Loader = ({
  size,
  children,
  className,
  isPending = false,
}: ILoader) => {
  return (
    <div className={cn("flex gap-2", className)}>
      {!isPending && children}
      {isPending && <Loader2 className="animate-spin" size={size} />}
    </div>
  );
};
