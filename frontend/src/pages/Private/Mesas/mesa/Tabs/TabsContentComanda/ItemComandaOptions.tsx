import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "@/components/EllipsisVertical/EllipsisVertical";
import { useRemoverOuRestaurarProduto } from "@/hooks/mutations/mesa/useRemoverProduto.mutation";
import { useState } from "react";
import { Loader } from "@/components/Loader/Loader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IComandaOptionsProps {
  isDeleted: boolean;
  id: number | string;
}

export const ItemComandaOptions = ({ isDeleted, id }: IComandaOptionsProps) => {
  const { mutate, isPending } = useRemoverOuRestaurarProduto();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  const submit = () => {
    mutate(
      { id, opcao: isDeleted ? "restaurar" : "remover" },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error(error.message, { duration: 3000 });
        },
      },
    );
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <EllipsisVertical size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="mr-6 w-fit tracking-wider"
        onFocusOutside={() => setIsOpen(false)}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {isDeleted ? "Restaurar" : "Remover"} Item ?
            </h4>
          </div>
          <Button
            className="space-x-2 tracking-wider"
            variant={isDeleted ? "default" : "destructive"}
            onClick={submit}
            disabled={isPending}
          >
            <div className="w-5" />
            <p>{isDeleted ? "Restaurar" : "Remover"}</p>
            <Loader
              size={18}
              className={cn("opacity-0", { "opacity-100": isPending })}
            />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
