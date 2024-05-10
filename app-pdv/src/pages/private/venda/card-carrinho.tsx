import { StatusDaVenda } from "@/common/enums/StatusDaVenda";
import { Loader } from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currencyFormt } from "@/helpers/currencyFormt";
import { RealizarVendaForm } from "@/hooks/mutations/venda/realizar-venda-schema";
import { useRealizarVenda } from "@/hooks/mutations/venda/useVenda.mutation";
import { useAuthStore } from "@/stores/auth.store";
import { useCarrinhoStore } from "@/stores/carrinho.store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const CardCarrinho = () => {
  const { user } = useAuthStore();
  const { carrinho, editaQuandidade, reset, total } = useCarrinhoStore();
  const { mutate, isPending } = useRealizarVenda();

  const submitVenda = () => {
    const form: RealizarVendaForm = {
      status: StatusDaVenda.FINALIZADA,
      usuario_id: Number(user?.sub) ?? 0,
      parcelas: 0,
      observacoes: "",
      valor_total: total(),
      desconto: 0,
      valor_pago: total(),
      prods: carrinho.map((item) => ({
        id: item.produto.id,
        quantidade: item.qnt,
      })),
    };

    mutate(form, {
      onSuccess: () => {
        toast.success("Venda realizada com sucesso.", {
          duration: 5000,
        });
        reset();
      },
      onError: (error) => {
        toast.error("Erro ao realizar venda.");
        console.warn(error.message);
      },
    });
  };

  return (
    <Card className="py-4 w-1/3">
      <div className="flex justify-between pl-4 pr-2 items-center pb-4">
        <CardTitle className="tracking-wide font-bold text-xl">
          Carrinho
        </CardTitle>

        <Button variant="destructive" size="icon" onClick={reset}>
          <Trash2 size={18} />
        </Button>
      </div>
      <Separator />

      <CardContent className="p-0 pl-2">
        <ScrollArea className="h-[600px] pr-3">
          <div className="pb-10">
            {carrinho.map((item) => (
              <div key={item.produto.id} className="pt-4">
                <div className="flex justify-between pb-2">
                  <p className="pl-2">{item.produto.nome}</p>
                  <div className="flex gap-1">
                    <Button
                      className="transition-all duration-300"
                      variant={item.qnt === 0 ? "destructive" : "secondary"}
                      size="icon"
                      onClick={() =>
                        editaQuandidade(item.produto.id, --item.qnt)
                      }
                    >
                      {item.qnt === 0 ? (
                        <Trash2 size={18} />
                      ) : (
                        <Minus size={18} />
                      )}
                    </Button>
                    <Input
                      className="w-14"
                      type="number"
                      min={1}
                      value={item.qnt}
                      onChange={(ev) => {
                        editaQuandidade(item.produto.id, +ev.target.value);
                      }}
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() =>
                        editaQuandidade(item.produto.id, ++item.qnt)
                      }
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <Separator />
      <CardFooter className="px-4 py-2 pt-4">
        <div className="flex justify-between w-full">
          <p className="font-semibold tracking-wide">
            Total: {currencyFormt(total())}
          </p>

          <Button
            className="w-40"
            disabled={carrinho.length === 0}
            onClick={submitVenda}
          >
            <Loader isPending={isPending} size={18}>
              <p>Finalizar venda</p>
            </Loader>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
