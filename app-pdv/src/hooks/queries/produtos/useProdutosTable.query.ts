import { useQuery } from "@tanstack/react-query";
import { useProdutos } from "./useProdutos.query";
import { ProdutoTableValidator } from "@/common/schemas/produto-table-schema";

export const PRODUTOS_TABLE_QUERY_KEY = "produtos-table";

export const useProdutosTable = () => {
  const { data: produtos } = useProdutos();

  const produtosTable = useQuery({
    queryKey: [PRODUTOS_TABLE_QUERY_KEY],
    enabled: !!produtos,
    queryFn: (): ProdutoTableValidator[] => {
      const produtosFiltradosTable = (produtos ?? []).map((item) => {
        const produtoFiltradoTable = {
          id: Number(item.id),
          codigo: item.codigo,
          nome: item.nome,
          descricao: item.descricao,
          preco_venda: item.preco_venda,
          preco_compra: item.preco_compra,
        };
        return produtoFiltradoTable;
      });

      return produtosFiltradosTable;
    },
  });

  return { produtosTable, ...produtosTable };
};
