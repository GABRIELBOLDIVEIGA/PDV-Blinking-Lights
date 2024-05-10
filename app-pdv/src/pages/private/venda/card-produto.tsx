import { ProdutoValidator } from "@/common/schemas/produto-schema";
import { Card } from "@/components/ui/card";
import { currencyFormt } from "@/helpers/currencyFormt";
import { Separator } from "@radix-ui/react-separator";
import box from "@/assets/box.png";

export const CardProduto = (item: ProdutoValidator) => {
  return (
    <Card className="flex flex-col justify-between gap-2 w-32 h-fit cursor-pointer">
      <div className="flex flex-col gap-1">
        <img src={box} className="w-full p-2" />
        <Separator />

        <p className="text-xs tracking-wide px-2 truncate">{item.nome}</p>
      </div>

      <p className="text-sm font-semibold px-2 py-2">{currencyFormt(0)}</p>
    </Card>
  );
};
