import { z } from "zod";
import { StatusComanda } from "./StatusComanda.enum";

export const comanda_schema = z.object({
  id: z.coerce.number(),
  codigo: z.string().uuid(),
  status: z.nativeEnum(StatusComanda),
  total: z.coerce.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().or(z.null()),
  produtos: z.array(
    z.object({
      id: z.coerce.number(),
      created_at: z.string().datetime(),
      updated_at: z.string().datetime(),
      deleted_at: z.string().datetime().or(z.null()),
      produto: z.object({
        id: z.coerce.number(),
        codigo: z.string(),
        nome: z.string(),
        descricao: z.string(),
        preco_venda: z.coerce.number(),
        preco_compra: z.coerce.number(),
        created_at: z.string().datetime(),
        updated_at: z.string().datetime(),
        deleted_at: z.string().datetime().or(z.null()),
      }),
    }),
  ),
});

export type ComandaValidator = z.infer<typeof comanda_schema>;
