import {
  ProdutoValidator,
  produtoSchema,
} from "@/common/schemas/produto-schema";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const TODOS_PRODUTOS_QUERY_KEY = "todos-produtos";

export const useProdutos = () => {
  const { pdvApi } = useApi();

  const produtosQuery = useQuery({
    queryKey: [TODOS_PRODUTOS_QUERY_KEY],

    queryFn: async () => {
      const { data } = await pdvApi.get<ProdutoValidator[]>("/produto");

      const filter = data.filter((produto) => {
        if (produtoSchema.safeParse(produto).success) {
          return true;
        }

        console.warn("[Data] => ", produto);
        console.warn("[Error] => ", produtoSchema.safeParse(produto));

        return false;
      });

      return filter;
    },
  });

  return { produtosQuery, ...produtosQuery };
};
