import { useMesasQuery } from "@/hooks/new/queries/mesas/useMesas.query";
import { Mesa } from "./mesa/Mesa";

export const TodasMesas = () => {
  const { data } = useMesasQuery();

  return (
    <section className="py-6">
      <div className="flex items-center justify-center px-3 pb-6">
        <div className="w-full rounded-lg border"></div>
        <p className="w-fit min-w-fit px-4 font-semibold tracking-wide ">
          Mesas Ocupadas
        </p>
        <div className="w-full border"></div>
      </div>

      <div className="grid cursor-pointer grid-cols-3 place-items-center gap-4 px-4">
        {data?.map((mesa) => mesa.aberta && <Mesa key={mesa.id} {...mesa} />)}
      </div>

      <div className="flex items-center justify-center py-6">
        <div className="w-full rounded-lg border"></div>
        <p className="w-fit min-w-fit px-4 font-semibold tracking-wide">
          Mesas Disponíveis
        </p>
        <div className="w-full rounded-lg border"></div>
      </div>

      <div className="grid cursor-pointer grid-cols-3 place-items-center gap-4 px-4">
        {data?.map((mesa) => !mesa.aberta && <Mesa key={mesa.id} {...mesa} />)}
      </div>
    </section>
  );
};
