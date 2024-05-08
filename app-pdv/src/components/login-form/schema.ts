import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Informe um email valido." }),
  senha: z.string().min(6, "Senha deve ter mais de 6 caracteres."),
});

export type LoginForm = z.infer<typeof LoginSchema>;
