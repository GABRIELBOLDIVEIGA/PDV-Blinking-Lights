import { z } from "zod";

export const authSchema = z
  .object({
    sub: z.coerce.number().positive().int(),
    nome: z.string(),
    email: z.string().email(),
    permissao: z.string(),
    iat: z.coerce.number(),
    exp: z.coerce.number(),
  })
  .or(z.null());

export type AuthValidator = z.infer<typeof authSchema>;
