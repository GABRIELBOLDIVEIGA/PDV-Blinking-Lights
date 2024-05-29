import { StatusDaVenda } from "@/common/enums/StatusDaVenda";
import { z } from "zod";

export const realizarVendaSchema = z.object({
  status: z.nativeEnum(StatusDaVenda),

  usuario_id: z.coerce.number().positive().int(),

  parcelas: z.coerce.number().positive().int(),
  observacoes: z.string().default(""),
  valor_total: z.coerce.number().positive().multipleOf(0.01),
  desconto: z.coerce.number().positive().multipleOf(0.01),
  valor_pago: z.coerce.number().positive().multipleOf(0.01),
  prods: z.array(
    z.object({
      id: z.coerce.number().positive().int(),
      quantidade: z.coerce
        .number()
        .positive()
        .int()
        .min(1, "Quantidade minima deve ser 1."),
    })
  ),
});

export type RealizarVendaForm = z.infer<typeof realizarVendaSchema>;
