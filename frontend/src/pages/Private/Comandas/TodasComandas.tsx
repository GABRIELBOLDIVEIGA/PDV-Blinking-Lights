import { ScrollArea } from "@/components/ui/scroll-area";
import { useTodasComandas } from "@/hooks/comandas/useTodasComandas.query";
import { Comanda } from "./comanda/Comanda";
import { Link } from "react-router-dom";
import { Loader } from "@/components/Loader/Loader";

export const TodasComandas = () => {
  const { data, isPending } = useTodasComandas();

  return (
    <section className="p-4">
      <div className="h-[95%]">
        <ScrollArea className="h-[99%] ">
          <div className="flex  flex-col gap-2">
            {isPending && <Loader />}
            {data?.map((comanda) => {
              return (
                <Link
                  to={`/comandas/comanda/${comanda.codigo}`}
                  key={comanda.codigo}
                >
                  <Comanda comanda={comanda} />
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};
