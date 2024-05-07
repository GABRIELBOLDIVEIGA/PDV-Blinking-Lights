import { z } from "zod";
import { StatusCobranca } from "./StatusCobranca.enum";

export const gerar_cobranca_pix_schema = z.object({
  calendario: z.object({
    criacao: z.string().datetime(),
    expiracao: z.coerce.number(),
  }),
  txid: z.string(),
  revisao: z.coerce.number(),
  status: z.nativeEnum(StatusCobranca),
  valor: z.object({
    original: z.coerce.string(),
  }),
  chave: z.string().uuid(),
  loc: z.object({
    id: z.coerce.number(),
    location: z.string(),
    tipoCob: z.string(),
    criacao: z.string().datetime(),
  }),
  location: z.string(),
  pixCopiaECola: z.string(),
  qrcode: z.string(),
  imagemQrcode: z.string(),
  linkVisualizacao: z.string(),
});

export type GerarCobrancaPixResponseValidator = z.infer<
  typeof gerar_cobranca_pix_schema
>;
