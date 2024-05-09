import { columns } from "@/components/tables/produtos-table/columns";
import { ProdutosTable } from "@/components/tables/produtos-table/produtos-table";
import { useProdutosTable } from "@/hooks/queries/produtos/useProdutosTable.query";

export const Produtos = () => {
  const { data } = useProdutosTable();

  return (
    <section>
      <ProdutosTable data={data ?? []} columns={columns} />
    </section>
  );
};
