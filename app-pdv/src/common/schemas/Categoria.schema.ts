import { z } from "zod";

export const categoriaSchema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  descricao: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().or(z.null()),
});

export type CategoriaValidator = z.infer<typeof categoriaSchema>;
