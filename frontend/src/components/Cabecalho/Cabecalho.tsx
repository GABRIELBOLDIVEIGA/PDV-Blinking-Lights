import { MenuPerfil } from "./MenuPerfil/MenuPerfil";
import { cn } from "@/lib/utils";
import { MenuMobile } from "./Menu/MenuMobile";

interface IProps {
  className?: string;
}

export const Cabecalho = ({ ...props }: IProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex w-full justify-between border-b-[1px] border-primary bg-popover py-2 mobile:px-2 mobile:pl-4 tablet:px-2 desktop:px-16",
        props.className,
      )}
    >
      <MenuMobile className="hidden mobile:block" />
      <MenuPerfil />
    </div>
  );
};
