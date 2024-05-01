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
import { useAdicionarProduto } from "@/hooks/new/mutations/mesas/useAdicionarProduto.mutation";
import { useState } from "react";
import { Loader } from "@/components/Loader/Loader";
import { cn } from "@/lib/utils";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMesasQuery } from "@/hooks/new/queries/mesas/useMesas.query";
import { useMesasStore } from "@/store/new/useMesaStore";
import { Button } from "@/components/ui/button";

interface IAlertConfirmarPedido {
  children: JSX.Element;
}

export const AlertConfirmarPedido = ({ children }: IAlertConfirmarPedido) => {
  const { data } = useMesasQuery();
  const { mutate, isPending } = useAdicionarProduto();
  const mesas = useMesasStore((state) => state.mesas);
  const resetMesa = useMesasStore((state) => state.resetMesa);
  const mesaIdFocus = useMesasStore((state) => state.mesaIdFocus);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  const submit = () => {
    const mesa = mesas.find((mesa) => mesa.mesa_id === mesaIdFocus);
    if (mesa) {
      const prods = mesa.prods.map((item) => ({
        produto_id: +item.produto.id,
        quantidade: item.quantidade,
      }));

      const comanda_id = data?.find((d) => d.id === mesa.mesa_id)?.comanda?.id;

      if (comanda_id) {
        const form = {
          comanda_id: +comanda_id,
          mesa_id: +mesaIdFocus,
          prods,
        };

        mutate(form, {
          onSuccess: (data) => {
            toast.success(`${data}`, { duration: 1500 });
            setTimeout(() => {
              setIsOpen(false);
            }, 1000);
            resetMesa(mesaIdFocus);
            queryClient.invalidateQueries({
              predicate: ({ queryKey }) => queryKey[0] === "todas-mesas",
            });
          },
          onError: (error) => {
            toast.error(`Error: ${error.message}`, { duration: 5000 });
          },
        });
      } else {
        toast.error("Comanda não encontrada");
      }
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Corfirmar pedido?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar o pedido, os itens serão adicionados a comanda da mesa.
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
