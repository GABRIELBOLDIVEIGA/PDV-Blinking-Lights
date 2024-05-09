import { z } from "zod";

export const produtoTableSchema = z.object({
  id: z.coerce.number(),
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco_venda: z.coerce.number(),
  preco_compra: z.coerce.number(),
});

export type ProdutoTableValidator = z.infer<typeof produtoTableSchema>;
