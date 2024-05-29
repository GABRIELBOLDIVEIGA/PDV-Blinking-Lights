import { z } from "zod";

export const produtoTableSchema = z.object({
  id: z.coerce.number().positive().int(),
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco_venda: z.coerce.number().positive().multipleOf(0.01),
  preco_compra: z.coerce.number().positive().multipleOf(0.01),
});

export type ProdutoTableValidator = z.infer<typeof produtoTableSchema>;
