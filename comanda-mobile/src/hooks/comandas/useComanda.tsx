import { usePdvApi } from "@/lib/axios/usePdvApi";
import {
  ComandaValidator,
  comanda_schema,
} from "@/utils/validators/Comanda/Comanda";
import { useQuery } from "@tanstack/react-query";

export const useComanda = (id: string | undefined) => {
  const { pdvApi } = usePdvApi();

  const comanda = useQuery({
    queryKey: ["comanda", id],
    staleTime: 0,
    queryFn: async () => {
      const { data } = await pdvApi.get<ComandaValidator>(
        `/comandas/by-code/${id}`,
      );

      if (comanda_schema.safeParse(data).success) {
        return data;
      } else {
        console.warn("[Data] => ", data);
        console.warn("[Error] => ", comanda_schema.safeParse(data));
      }
    },
    enabled: !!id,
  });

  return { comanda, ...comanda };
};
