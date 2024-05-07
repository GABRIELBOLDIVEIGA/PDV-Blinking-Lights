import { permissaoSchema } from "@/utils/enums/Permicao";
import { z } from "zod";

export const usuarioAuthSchema = z
  .object({
    sub: z.coerce.number(),
    nome: z.string(),
    email: z.string().email(),
    permissao: permissaoSchema,
  })
  .nullable();

export type UsuarioAuth = z.infer<typeof usuarioAuthSchema>;
