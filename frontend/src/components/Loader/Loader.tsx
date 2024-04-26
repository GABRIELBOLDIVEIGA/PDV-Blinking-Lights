import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface IProps {
  size?: number;
  className?: string;
}

export const Loader = (props: IProps) => {
  return (
    <Loader2
      className={cn("animate-spin", props.className)}
      size={props.size}
    />
  );
};
