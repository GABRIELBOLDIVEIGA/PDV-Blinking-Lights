import { StatusDaVenda } from "@/common/enums/StatusDaVenda";
import { z } from "zod";

export const realizarVendaSchema = z.object({
  status: z.nativeEnum(StatusDaVenda),

  usuario_id: z.coerce.number(),

  parcelas: z.coerce.number(),
  observacoes: z.string().default(""),
  valor_total: z.coerce.number(),
  desconto: z.coerce.number(),
  valor_pago: z.coerce.number(),
  prods: z.array(
    z.object({
      id: z.coerce.number(),
      quantidade: z.coerce.number().min(1, "Quantidade minima deve ser 1."),
    })
  ),
});

export type RealizarVendaForm = z.infer<typeof realizarVendaSchema>;
