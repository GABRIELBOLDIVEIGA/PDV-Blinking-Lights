import { z } from "zod";
import { categoriaSchema } from "./categoria-schema";
import { subCategoriaSchema } from "./subCategoria-schema";
import { fornecedorSchema } from "./fornecedor-schema";

export const produtoSchema = z.object({
  id: z.coerce.number().positive().int(),
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco_venda: z.coerce.number().positive().multipleOf(0.01),
  preco_compra: z.coerce.number().positive().multipleOf(0.01),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),

  categorias: z.array(
    z.object({
      id: z.coerce.number().positive().int(),
      categoria: categoriaSchema,
    })
  ),

  fornecedores: z.array(
    z.object({
      id: z.coerce.number().positive().int(),
      fornecedor: fornecedorSchema,
    })
  ),

  subCategorias: z.array(
    z.object({
      id: z.coerce.number().positive().int(),
      subCategoria: subCategoriaSchema,
    })
  ),
});

export type ProdutoValidator = z.infer<typeof produtoSchema>;
