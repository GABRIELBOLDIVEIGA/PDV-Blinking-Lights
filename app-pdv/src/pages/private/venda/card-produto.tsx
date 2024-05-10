import { ProdutoValidator } from "@/common/schemas/produto-schema";
import { Card } from "@/components/ui/card";
import { currencyFormt } from "@/helpers/currencyFormt";
import { Separator } from "@radix-ui/react-separator";
import box from "@/assets/box.png";
import { useCarrinhoStore } from "@/stores/carrinho.store";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CardProduto = (item: ProdutoValidator) => {
  const { carrinho, addProduto, removeProduto } = useCarrinhoStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              "flex flex-col justify-between gap-2 w-32 h-fit cursor-pointer transition-all duration-300 shadow-xl",
              {
                "ring-2 ring-primary": carrinho.find(
                  (produto) => produto.produto.id === item.id
                ),
              }
            )}
            onDoubleClick={() =>
              carrinho.find((produto) => produto.produto.id === item.id)
                ? removeProduto(item.id)
                : addProduto(item)
            }
          >
            <div className="flex flex-col gap-1">
              <img src={box} className="w-full p-2" />
              <Separator className="border-[1px] opacity-80" />

              <p className="text-xs tracking-wide px-2 truncate">{item.nome}</p>
            </div>

            <p className="text-sm font-semibold px-2 pb-2">
              {currencyFormt(item.preco_venda)}
            </p>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click duplo para adiconar ou remover</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
