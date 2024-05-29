import {
  FornecedorValidator,
  fornecedorSchema,
} from "@/common/schemas/fornecedor-schema";
import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const TODOSA_FORNECEDORES_QUERY_KEY = "todos-fornecedores";

export const useFornecedores = () => {
  const { pdvApi } = useApi();

  const fornecedoresQuery = useQuery({
    queryKey: [TODOSA_FORNECEDORES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await pdvApi.get<FornecedorValidator[]>("/fornecedor");

      const filter = data.filter((fornecedor) => {
        if (fornecedorSchema.safeParse(fornecedor).success) {
          return true;
        } else {
          console.warn("[Data] => ", fornecedor);
          console.warn("[Error] => ", fornecedorSchema.safeParse(data));
          return false;
        }
      });

      return filter;
    },
  });

  return { fornecedoresQuery, ...fornecedoresQuery };
};
