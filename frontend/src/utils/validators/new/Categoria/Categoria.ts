import { z } from "zod";

export const categoria_schema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  descricao: z.string(),
  subCategorias: z.array(
    z.object({
      subCategoria: z.object({
        id: z.coerce.number(),
        nome: z.string(),
      }),
    }),
  ),
});

export type CategoriaValidator = z.infer<typeof categoria_schema>;
