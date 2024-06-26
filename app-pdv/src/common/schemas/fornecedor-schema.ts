import { z } from "zod";

export const fornecedorSchema = z.object({
  id: z.coerce.number().positive().int(),
  nome: z.string(),
  documento: z.string(),
  observacoes: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),
});

export type FornecedorValidator = z.infer<typeof fornecedorSchema>;
