import { usePdvApi } from "@/lib/axios/usePdvApi";
import {
  ComandaValidator,
  comanda_schema,
} from "@/utils/validators/Comanda/Comanda";
import { useQuery } from "@tanstack/react-query";

export const useTodasComandas = () => {
  const { pdvApi } = usePdvApi();

  const comandasQuery = useQuery({
    queryKey: ["todas-comandas"],
    queryFn: async () => {
      const { data } = await pdvApi.get<ComandaValidator[]>("comandas");

      const filter = data.filter((comanda) => {
        if (comanda_schema.safeParse(comanda).success) {
          return true;
        } else {
          console.warn("[Data] => ", comanda);
          console.warn("[Error] => ", comanda_schema.safeParse(comanda));
          return false;
        }
      });

      filter?.sort((a, b) => {
        if (a.updated_at < b.updated_at) {
          return 1;
        }
        if (a.updated_at > b.updated_at) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      return filter;
    },
  });

  return { comandasQuery, ...comandasQuery };
};
