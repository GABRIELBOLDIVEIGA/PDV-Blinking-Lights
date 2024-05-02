import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useMutation } from "@tanstack/react-query";

interface IParams {
  id: number | string;
  opcao: "remover" | "restaurar";
}

export const useRemoverOuRestaurarProduto = () => {
  const { pdvApi } = usePdvApi();

  const removerOuRestaurarProduto = useMutation({
    mutationKey: ["remover-produto"],
    mutationFn: async ({ id, opcao }: IParams) => {
      const { data } = await pdvApi.patch<string>(
        `/comandas/${opcao}-produto/${id}`,
      );

      return data;
    },
  });

  return { removerOuRestaurarProduto, ...removerOuRestaurarProduto };
};
