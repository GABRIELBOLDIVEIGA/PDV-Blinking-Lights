import { cn } from "@/lib/utils";
import { ProdutoComanda } from "@/utils/validators/Mesa/Mesa";
import { ItemComandaOptions } from "./ItemComandaOptions";

export const ItemComanda = (item: ProdutoComanda) => {
  return (
    <div
      className={cn("flex items-center justify-between", {
        "line-through opacity-50": item.deleted_at,
      })}
    >
      <div className="w-2/3 capitalize">
        <p className="truncate font-bold tracking-wide">
          {item.produto.nome.toLowerCase()}
        </p>
        <p className="truncate text-sm font-semibold tracking-wide opacity-70">
          {item.produto.descricao.toLowerCase()}
        </p>
      </div>

      <div className="max-w-1/3 flex w-fit items-center gap-4">
        <p>x 1</p>
        <ItemComandaOptions id={item.id} isDeleted={!!item.deleted_at} />
      </div>
    </div>
  );
};
