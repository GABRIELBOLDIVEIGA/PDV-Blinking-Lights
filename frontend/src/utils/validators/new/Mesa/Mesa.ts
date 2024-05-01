import { z } from "zod";
import { StatusComanda } from "../Comanda/StatusComanda.enum";

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
      produtos: z.array(
        z.object({
          produto: z.object({
            id: z.coerce.number(),
            codigo: z.string(),
            nome: z.string(),
            descricao: z.string(),
            preco_venda: z.coerce.number(),
          }),
        }),
      ),
    })
    .or(z.null()),
});

export type MesaValidator = z.infer<typeof mesa_schema>;
