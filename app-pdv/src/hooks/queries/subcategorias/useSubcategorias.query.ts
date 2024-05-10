import {
  SubCategoriaValidator,
  subCategoriaSchema,
} from "@/common/schemas/subCategoria-schema";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const TODAS_SUBCATEGORIAS_QUERY_KEY = "todas-subcategorias";

export const useSubcategorias = () => {
  const { pdvApi } = useApi();

  const subcategoriasQuery = useQuery({
    queryKey: [TODAS_SUBCATEGORIAS_QUERY_KEY],
    queryFn: async () => {
      const { data } =
        await pdvApi.get<SubCategoriaValidator[]>("/sub-categoria");

      const filter = data.filter((subcategoria) => {
        if (subCategoriaSchema.safeParse(subcategoria).success) {
          return true;
        } else {
          console.warn("[Data] => ", subcategoria);
          console.warn(
            "[Error] => ",
            subCategoriaSchema.safeParse(subcategoria)
          );
          return false;
        }
      });

      return filter;
    },
  });

  return { subcategoriasQuery, ...subcategoriasQuery };
};
