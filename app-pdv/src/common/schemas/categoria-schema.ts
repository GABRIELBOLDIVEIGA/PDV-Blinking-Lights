import { z } from "zod";
import { subCategoriaSchema } from "./subCategoria-schema";

export const categoriaSchema = z.object({
  id: z.coerce.number().positive().int(),
  nome: z.string(),
  descricao: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),
  subCategorias: z.array(
    z.object({
      id: z.coerce.number().positive().int(),
      subCategoria: subCategoriaSchema,
    })
  ),
});

export type CategoriaValidator = z.infer<typeof categoriaSchema>;
