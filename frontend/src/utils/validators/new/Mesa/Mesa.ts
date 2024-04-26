import { z } from "zod";

export const mesa_schema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  aberta: z.boolean(),
  produtos: z.array(
    z.object({
      quantidade: z.coerce.number(),
      produto: z.object({
        id: z.coerce.number(),
        nome: z.string(),
        descricao: z.string(),
        preco_venda: z.coerce.number(),
      }),
    }),
  ),
});

export type MesaValidator = z.infer<typeof mesa_schema>;
