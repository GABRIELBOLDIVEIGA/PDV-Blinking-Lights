import { CircleUser } from "lucide-react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarSchadcn,
} from "../ui/avatar";
import defaultAvatar from "@/assets/default-avatar.gif";

interface IAvatar {
  className?: string;
  src?: string;
}

export const Avatar = ({ ...props }: IAvatar) => {
  return (
    <AvatarSchadcn className={props.className}>
      <AvatarImage src={props.src ? props.src : ""} />
      {/* <AvatarImage src={props.src ? props.src : defaultAvatar} /> */}
      <AvatarFallback>
        <CircleUser size={18} />
      </AvatarFallback>
    </AvatarSchadcn>
  );
};
