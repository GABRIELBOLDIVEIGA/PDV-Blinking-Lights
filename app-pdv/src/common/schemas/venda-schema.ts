import { z } from "zod";
import { StatusDaVenda } from "../enums/StatusDaVenda";
import { produtoSchema } from "./produto-schema";
import { formaPagamentoSchema } from "./forma-pagamento-schema";
import { clienteSchema } from "./cliente-schema";

export const vendaSchema = z.object({
  id: z.coerce.number().positive().int(),
  uuid: z.string().uuid(),
  parcelas: z.coerce.number().min(0),
  observacoes: z.string(),
  valor_total: z.coerce.number().positive(),
  desconto: z.coerce.number().min(0),
  valor_pago: z.coerce.number().positive(),
  status: z.nativeEnum(StatusDaVenda),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),

  formaDePagamento: formaPagamentoSchema.or(z.null()),

  cliente: clienteSchema.or(z.null()),

  usuario: z.object({
    id: z.coerce.number().positive().int(),
    permissao: z.string(),
    nome: z.string(),
    email: z.string().email(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    deleted_at: z.coerce.date().or(z.null()),
  }),

  produtos: z.array(
    z.object({
      id: z.coerce.number().positive().int(),
      quantidade: z.coerce.number().positive().int(),
      produto: produtoSchema.pick({
        id: true,
        codigo: true,
        nome: true,
        descricao: true,
        preco_compra: true,
        preco_venda: true,
      }),
    })
  ),
});

export type VendaValidator = z.infer<typeof vendaSchema>;
