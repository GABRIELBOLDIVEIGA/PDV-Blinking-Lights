import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const TOTAL_DE_ITENS_VENDIDOS = "total-de-itens-vendidos";

export const useTotalDeItensVendidos = () => {
  const { pdvApi } = useApi();

  const totalDeItensVendidos = useQuery({
    queryKey: [TOTAL_DE_ITENS_VENDIDOS],
    queryFn: async () => {
      const { data } = await pdvApi.get<number>(
        "/venda/total-de-itens-vendidos"
      );

      return data;
    },
  });

  return { totalDeItensVendidos, ...totalDeItensVendidos };
};
