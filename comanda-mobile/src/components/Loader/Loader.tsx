import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface IProps {
  size?: number;
  className?: string;
}

export const Loader = (props: IProps) => {
  return (
    <div className={cn("flex justify-center", props.className)}>
      <Loader2 className="animate-spin" size={props.size} />
    </div>
  );
};
