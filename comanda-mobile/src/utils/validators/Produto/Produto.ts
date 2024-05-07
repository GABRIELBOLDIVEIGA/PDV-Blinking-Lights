import { z } from "zod";

export const produto_schema = z.object({
  id: z.coerce.number(),
  codigo: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco_venda: z.coerce.number(),
  preco_compra: z.coerce.number(),

  categorias: z.array(
    z.object({
      id: z.coerce.number(),
      categoria: z.object({
        id: z.coerce.number(),
        nome: z.string(),
        descricao: z.string(),
        subCategorias: z.array(
          z.object({
            id: z.coerce.number(),
            subCategoria: z.object({
              id: z.coerce.number(),
              nome: z.string(),
              descricao: z.string(),
            }),
          }),
        ),
      }),
    }),
  ),
  fornecedores: z.array(
    z.object({
      id: z.coerce.number(),
      fornecedor: z.object({
        id: z.coerce.number(),
        nome: z.string(),
        observacoes: z.string(),
      }),
    }),
  ),
  subCategorias: z.array(
    z.object({
      id: z.coerce.number(),
      subCategoria: z.object({
        id: z.coerce.number(),
        nome: z.string(),
        descricao: z.string(),
      }),
    }),
  ),
});

export type ProdutoValidator = z.infer<typeof produto_schema>;
