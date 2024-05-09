import { z } from "zod";

export const fornecedorSchema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  observacoes: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().or(z.null()),
});

export type FornecedorValidator = z.infer<typeof fornecedorSchema>;
