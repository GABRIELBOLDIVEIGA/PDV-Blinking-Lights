import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import {
  ProdutoValidator,
  produto_schema,
} from "@/utils/validators/new/Produto/Produto";
import { useQuery } from "@tanstack/react-query";

export const useProdutosQuery = () => {
  const { pdvApi } = usePdvApi();

  const produtosQuery = useQuery({
    queryKey: ["produtos"],
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
