import { z } from "zod";

export const subCategoriaSchema = z.object({
  id: z.coerce.number().positive().int(),
  nome: z.string(),
  descricao: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),
});

export type SubCategoriaValidator = z.infer<typeof subCategoriaSchema>;
