import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { useMesasStore } from "@/store/new/useMesaStore";
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
import { Button } from "@/components/ui/button";
import { useAdicionarProduto } from "@/hooks/new/mutations/mesas/useAdicionarProduto.mutation";
import { useState } from "react";
import { Loader } from "@/components/Loader/Loader";
import { cn } from "@/lib/utils";
import { queryClient } from "@/lib/react-query/queryClient";

interface IProps {
  value: string;
}

export const TabsContentPedido = ({ value }: IProps) => {
  const mesas = useMesasStore((state) => state.mesas);
  const mesaIdFocus = useMesasStore((state) => state.mesaIdFocus);

  return (
    <TabsContent value={value} className="h-[98%]">
      <Card className="h-full border-none shadow-inner">
        <CardContent className="h-full pt-6 mobile:px-4 mobile:pt-4">
          <ScrollArea className="relative h-[100%]">
            <div className="space-y-2 pb-12">
              {mesas.map(
                (mesa) =>
                  mesa.mesa_id === mesaIdFocus &&
                  mesa.prods.map((item) => (
                    <div
                      key={item.produto.id}
                      className="flex items-center justify-between pr-3"
                    >
                      <div className="w-[80%] capitalize">
                        <p className="truncate font-bold tracking-wide">
                          {item.produto.nome}
                        </p>
                        <p className="truncate text-sm font-semibold tracking-wide opacity-70">
                          {item.produto.descricao}
                        </p>
                      </div>
                      <div>
                        <p>x {item.quantidade}</p>
                      </div>
                    </div>
                  )),
              )}
            </div>
            <div className="absolute bottom-0 flex w-full items-center justify-center">
              <AlertConfirmarPedido>
                <Button className="w-full">Confirmar Pedido</Button>
              </AlertConfirmarPedido>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

interface IAlertConfirmarPedido {
  children: JSX.Element;
}

export const AlertConfirmarPedido = ({ children }: IAlertConfirmarPedido) => {
  const { mutate, isPending } = useAdicionarProduto();
  const mesas = useMesasStore((state) => state.mesas);
  const resetMesa = useMesasStore((state) => state.resetMesa);
  const mesaIdFocus = useMesasStore((state) => state.mesaIdFocus);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  const submit = () => {
    const mesa = mesas.find((mesa) => mesa.mesa_id === mesaIdFocus);
    if (mesa) {
      const prods = mesa.prods.map((item) => ({
        produto_id: item.produto.id,
        quantidade: item.quantidade,
      }));
      const form = { mesa_id: +mesaIdFocus, prods };

      mutate(form, {
        onSuccess: (data) => {
          toast.success(data, { duration: 2500 });
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
