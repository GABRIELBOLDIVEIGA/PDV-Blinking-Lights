import { usePdvApi } from "@/lib/axios/usePdvApi";
import {
  ProdutoValidator,
  produto_schema,
} from "@/utils/validators/Produto/Produto";
import { useQuery } from "@tanstack/react-query";

export const TODOS_PRODUTOS_QUERY_KEY = "todos-produtos";

export const useProdutosQuery = () => {
  const { pdvApi } = usePdvApi();

  const produtosQuery = useQuery({
    queryKey: [TODOS_PRODUTOS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await pdvApi.get<ProdutoValidator[]>("/produto");

      const produtos: ProdutoValidator[] = data.filter((produto) => {
        if (produto_schema.safeParse(produto).success) {
          return true;
        } else {
          console.warn("[Data] => ", produto);
          console.warn("[Error] => ", produto_schema.safeParse(produto));
        }
      });

      return produtos;
    },
  });

  return { produtosQuery, ...produtosQuery };
};
