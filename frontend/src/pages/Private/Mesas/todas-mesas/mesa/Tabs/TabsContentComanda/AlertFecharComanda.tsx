import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Loader } from "@/components/Loader/Loader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFecharMesa } from "@/hooks/new/mutations/mesas/useFecharMesa.mutation";
import { queryClient } from "@/lib/react-query/queryClient";

interface IFecharComanda {
  children: JSX.Element;
  mesa_id: number;
}

export const AlertFecharComanda = ({ children, mesa_id }: IFecharComanda) => {
  const { mutate, isPending } = useFecharMesa();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  const submit = () => {
    mutate(mesa_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === "todas-mesas",
        });
        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
      },
      onError: (error) => {
        toast.error(`${error.message}`, { duration: 3500 });
      },
    });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Fechar Comanda?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, a mesa passara a esta disponível.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button onClick={submit} className="space-x-2">
            <span>Confirmar</span>
            <Loader className={cn("hidden", { "block ": isPending })} />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
