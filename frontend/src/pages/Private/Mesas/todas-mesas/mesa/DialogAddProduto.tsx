import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdicionarProduto } from "@/hooks/new/mutations/mesas/useAdicionarProduto.mutation";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMesaStore } from "@/store/new/useMesaStore";
import { ProdutoValidator } from "@/utils/validators/new/Produto/Produto";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

interface IDialogAddProduto {
  children: JSX.Element;
  produto: ProdutoValidator;
}

export const DialogAddProduto = ({ children, produto }: IDialogAddProduto) => {
  const mesaId = useMesaStore((state) => state.mesaId);
  const { mutate } = useAdicionarProduto();
  const [quantidade, setQuantidade] = useState<number>();

  const addProduto = () => {
    console.log("[ADD Produto]");
    if (mesaId && quantidade) {
      mutate(
        { mesa_id: +mesaId, produto_id: +produto.id, quantidade },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: ({ queryKey }) => queryKey[0] === "todas-mesas",
            });
            toast.success("Produto adicionado.", { duration: 2000 });
          },
          onError: (error) => {
            toast.error(`Error: ${error.message}`, {
              duration: 3000,
            });
          },
        },
      );
    }
  };

  return (
    <AlertDialog>
      <Toaster />
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex h-full flex-col justify-between p-0">
        <AlertDialogHeader className="relative h-fit pt-2">
          <AlertDialogTitle className="capitalize">
            {produto.nome.toLowerCase()}
          </AlertDialogTitle>
          <AlertDialogDescription className="capitalize">
            {produto.descricao.toLowerCase()}
          </AlertDialogDescription>

          <AlertDialogCancel className="absolute right-2 inline-flex h-9 w-9 -translate-y-1 items-center justify-center whitespace-nowrap rounded-md border   border-input bg-background text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            <div>
              <X size={18} />
            </div>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="flex h-full justify-center gap-4 px-2 pt-6">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>

          <Input
            className="w-1/3"
            placeholder="0"
            value={quantidade}
            onChange={(ev) => {
              setQuantidade(+ev.target.value);
            }}
          />

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>

        <AlertDialogFooter className="h-fit px-2 pb-2">
          <AlertDialogAction
            disabled={quantidade === 0 || !quantidade}
            onClick={addProduto}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
