import { Loader } from "@/components/Loader/Loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useComanda } from "@/hooks/comandas/useComanda";
import { cn } from "@/lib/utils";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { StatusComanda } from "@/utils/validators/Comanda/StatusComanda.enum";
import { useParams } from "react-router-dom";
import { Footer } from "./Footer";

export const ComandaDetalhes = () => {
  const params = useParams<{ id: string }>();
  const { data, isPending } = useComanda(params.id);

  return (
    <section className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{data?.mesa.nome}</CardTitle>

          <CardTitle>
            Comanda: <span className="text-sm font-normal">{params.id}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-1">
          {isPending && <Loader />}

          {data?.produtos.map((item) => (
            <div
              key={item.id}
              className={cn("flex items-center justify-between", {
                "line-through opacity-50": item.deleted_at,
              })}
            >
              <div className="w-2/3 capitalize">
                <p className="truncate font-bold tracking-wide">
                  {item.produto.nome.toLowerCase()}
                </p>
              </div>

              <div className="max-w-1/3 flex w-fit items-center gap-4 text-sm">
                <p>x 1</p>
                <p>{currencyFormt(item.produto.preco_venda)}</p>
              </div>
            </div>
          ))}
          <div className="text-end underline underline-offset-4">
            Total: {currencyFormt(data ? data.total : 0)}
          </div>
        </CardContent>

        {data?.status === StatusComanda.FECHADO && (
          <CardFooter className="flex items-center justify-center text-center font-semibold">
            Pagamento Realizado {new Date(data.updated_at).toLocaleString()}
          </CardFooter>
        )}
        {data?.status === StatusComanda.AGUARDANDO_PAGAMENTO && (
          <Footer comanda={data} />
        )}
      </Card>
    </section>
  );
};
