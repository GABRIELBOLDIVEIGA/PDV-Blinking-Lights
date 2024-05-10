import { CategoriasTable } from "@/components/tables/categorias-table/categorias-table";
import { columns } from "@/components/tables/categorias-table/columns";
import { useCategorias } from "@/hooks/queries/categoria/useCategorias.query";

export const Categorias = () => {
  const { data } = useCategorias();

  return (
    <section className="">
      <CategoriasTable data={data ?? []} columns={columns} />
    </section>
  );
};
