import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import {
  CategoriaValidator,
  categoria_schema,
} from "@/utils/validators/new/Categoria/Categoria";
import { useQuery } from "@tanstack/react-query";

export const TODAS_CATEGORIAS_QUERY_KEY = "todas-categorias";

export const useCategoriasQuery = () => {
  const { pdvApi } = usePdvApi();

  const categoriasQuery = useQuery({
    queryKey: [TODAS_CATEGORIAS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await pdvApi.get<CategoriaValidator[]>("/categorias");

      const categorias = data.filter((categoria) => {
        if (categoria_schema.safeParse(categoria).success) {
          return true;
        } else {
          console.warn("[Data] => ", categoria);
          console.warn("[Error] => ", categoria_schema.safeParse(categoria));
        }
      });

      return categorias;
    },
  });

  return { categoriasQuery, ...categoriasQuery };
};
