import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const add_produto_schema = z.object({
  mesa_id: z.coerce.number(),
  comanda_id: z.coerce.number(),
  prods: z.array(
    z.object({
      produto_id: z.coerce.number(),
      quantidade: z.coerce.number(),
    }),
  ),
});

type AddProdutoValidator = z.infer<typeof add_produto_schema>;

export const ADICIONA_PRODUTO_MUTATION_KEY = "adiciona-produto";

export const useAdicionarProduto = () => {
  const { pdvApi } = usePdvApi();

  const adicononarProduto = useMutation({
    mutationKey: ["adiciona-produto"],
    mutationFn: async (form: AddProdutoValidator) => {
      const { data } = await pdvApi.post<string>(
        "/comandas/adicionar-produtos",
        form,
      );

      return data;
    },
  });

  return { adicononarProduto, ...adicononarProduto };
};
