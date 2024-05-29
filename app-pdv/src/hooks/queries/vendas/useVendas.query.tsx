import { VendaValidator, vendaSchema } from "@/common/schemas/venda-schema";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const TODAS_VENDAS_QUERY_KEY = "todas-vendas";

export const useVendas = () => {
  const { pdvApi } = useApi();

  const vendaQuery = useQuery({
    queryKey: [TODAS_VENDAS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await pdvApi.get<VendaValidator[]>("/venda");

      const filter = data.filter((venda) => {
        if (vendaSchema.safeParse(venda).success) {
          return true;
        } else {
          console.warn("[Data] => ", venda);
          console.warn("[Error] => ", vendaSchema.safeParse(venda));
          return false;
        }
      });

      return filter;
    },
  });

  return { vendaQuery, ...vendaQuery };
};

export const useVendasPorDia = () => {
  const days: Array<{ day: number; qnt: number }> = new Array(31)
    .fill(0)
    .map((_, i) => ({ day: i + 1, qnt: 0 }));

  const { data } = useVendas();

  const vendasPorDia: Array<{ day: number; qnt: number }> = days.map((dia) => {
    const qnt = data?.filter((venda) => {
      return new Date(`${venda.created_at}`).getDate() === dia.day;
    });

    return { ...dia, qnt: qnt?.length ?? 0 };
  });

  return vendasPorDia;
};
