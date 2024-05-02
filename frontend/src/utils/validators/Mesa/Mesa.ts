import { z } from "zod";
import { StatusComanda } from "../Comanda/StatusComanda.enum";

export const produto_comanda_schema = z.object({
  id: z.coerce.number(),
  created_at: z.string().datetime(),
  deleted_at: z.string().datetime().or(z.null()),
  produto: z.object({
    id: z.coerce.number(),
    codigo: z.string(),
    nome: z.string(),
    descricao: z.string(),
    preco_venda: z.coerce.number(),
  }),
});

export type ProdutoComanda = z.infer<typeof produto_comanda_schema>;

export const mesa_schema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  disponivel: z.boolean(),
  comanda: z
    .object({
      id: z.coerce.number(),
      codigo: z.string().uuid(),
      status: z.nativeEnum(StatusComanda),
      total: z.number(),
      produtos: z.array(produto_comanda_schema),
    })
    .or(z.null()),
});

export type MesaValidator = z.infer<typeof mesa_schema>;
