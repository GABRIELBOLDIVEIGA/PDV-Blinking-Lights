import { z } from "zod";
import { subCategoriaSchema } from "./subCategoria-schema";

export const categoriaSchema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  descricao: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().or(z.null()),
  subCategorias: z.array(
    z.object({
      id: z.coerce.number(),
      subCategoria: subCategoriaSchema,
    })
  ),
});

export type CategoriaValidator = z.infer<typeof categoriaSchema>;
