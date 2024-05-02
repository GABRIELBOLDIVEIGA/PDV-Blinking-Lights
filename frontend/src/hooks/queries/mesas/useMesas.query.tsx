import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import { MesaValidator, mesa_schema } from "@/utils/validators/Mesa/Mesa";
import { useQuery } from "@tanstack/react-query";

export const TODAS_MESAS_QUERY_KEY = "todas-mesas";

export const useMesasQuery = () => {
  const { pdvApi } = usePdvApi();

  const mesasQuery = useQuery({
    queryKey: [TODAS_MESAS_QUERY_KEY],

    queryFn: async () => {
      const { data } = await pdvApi.get<MesaValidator[]>("/mesa");

      const mesas: MesaValidator[] = data.filter((mesa) => {
        if (mesa_schema.safeParse(mesa).success) {
          return true;
        } else {
          console.warn("[Data] => ", mesa);
          console.warn("[Error] => ", mesa_schema.safeParse(mesa));
          return false;
        }
      });

      return mesas;
    },
  });

  return { mesasQuery, ...mesasQuery };
};
