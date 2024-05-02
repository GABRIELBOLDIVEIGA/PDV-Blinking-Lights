import { useMesasQuery } from "@/hooks/new/queries/mesas/useMesas.query";
import { Mesa } from "./mesa/Mesa";

export const TodasMesas = () => {
  const { data } = useMesasQuery();

  return (
    <section className="py-6">
      <div className="grid cursor-pointer grid-cols-3 place-items-center gap-4 px-4">
        {data?.map((mesa) => <Mesa key={mesa.id} {...mesa} />)}
      </div>
    </section>
  );
};
