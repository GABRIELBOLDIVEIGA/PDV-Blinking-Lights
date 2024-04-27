import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import { useMutation } from "@tanstack/react-query";

export const useAdicionarProduto = () => {
  const { pdvApi } = usePdvApi();

  const adicononarProduto = useMutation({
    mutationKey: ["adiciona-produto"],
    mutationFn: async (form: {
      produto_id: number;
      mesa_id: number;
      quantidade: number;
    }) => {
      console.log("[Form] => ", form);
      const { data } = await pdvApi.post<{ quantidade: number }>(
        "/mesa/adicionar-produto",
        form,
      );

      return data;
    },
  });

  return { adicononarProduto, ...adicononarProduto };
};
