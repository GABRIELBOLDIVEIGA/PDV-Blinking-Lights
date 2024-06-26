import {
  CategoriaValidator,
  categoriaSchema,
} from "@/common/schemas/categoria-schema";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const TODAS_CATEGORIAS_QUERY_KEY = "todas-categorias";

export const useCategorias = () => {
  const { pdvApi } = useApi();

  const categoriaQuery = useQuery({
    queryKey: [TODAS_CATEGORIAS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await pdvApi.get<CategoriaValidator[]>("/categorias");

      const filter = data.filter((categoria) => {
        if (categoriaSchema.safeParse(categoria).success) {
          return true;
        }

        console.warn("[Data] => ", categoria);
        console.warn("[Error] => ", categoriaSchema.safeParse(categoria));

        return false;
      });

      return filter;
    },
  });

  return { categoriaQuery, ...categoriaQuery };
};
