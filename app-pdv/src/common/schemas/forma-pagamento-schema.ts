import { z } from "zod";

export const formaPagamentoSchema = z.object({
  id: z.coerce.number().positive().int(),
  nome: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),
});

export type FormaPagamentoValidator = z.infer<typeof formaPagamentoSchema>;
