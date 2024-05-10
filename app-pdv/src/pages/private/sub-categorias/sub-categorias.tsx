import { columns } from "@/components/tables/subcategorias-table/columns";
import { SubCategoriasTable } from "@/components/tables/subcategorias-table/subcategorias-table";
import { useSubcategorias } from "@/hooks/queries/subcategorias/useSubcategorias.query";

export const SubCategorias = () => {
  const { data } = useSubcategorias();
  return <SubCategoriasTable data={data ?? []} columns={columns} />;
};
