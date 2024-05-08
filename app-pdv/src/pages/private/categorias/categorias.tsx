import { CategoriasTable } from "@/components/tables/categorias-table/categorias-table";
import { columns } from "@/components/tables/categorias-table/columns";
import { useCategoria } from "@/hooks/queries/categoria/useCategorias.query";

export const Categorias = () => {
  const { data } = useCategoria();

  return (
    <section className="">
      <CategoriasTable data={data ?? []} columns={columns} />
    </section>
  );
};
