import { z } from "zod";

export const clienteSchema = z.object({
  id: z.coerce.number().positive().int(),
  nome: z.string(),
  documento: z.string(),
  email: z.string().email(),
  tel1: z.string(),
  tel2: z.string(),
  tel3: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().or(z.null()),
});

export type ClienteValidator = z.infer<typeof clienteSchema>;
