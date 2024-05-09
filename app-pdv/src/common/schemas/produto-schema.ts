import { z } from "zod";
import { categoriaSchema } from "./categoria-schema";
import { subCategoriaSchema } from "./subCategoria-schema";
import { fornecedorSchema } from "./fornecedor-schema";

export const produtoSchema = z.object({
  id: z.coerce.number(),
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco_venda: z.coerce.number(),
  preco_compra: z.coerce.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().or(z.null()),

  categorias: z.array(
    z.object({
      id: z.coerce.number(),
      categoria: categoriaSchema,
    })
  ),

  fornecedores: z.array(
    z.object({
      id: z.coerce.number(),
      fornecedor: fornecedorSchema,
    })
  ),

  subCategorias: z.array(
    z.object({
      id: z.coerce.number(),
      subCategoria: subCategoriaSchema,
    })
  ),
});

export type ProdutoValidator = z.infer<typeof produtoSchema>;
