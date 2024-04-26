import { z } from "zod";

export const orcamento_table_schema = z.object({
  _id: z.string(),
  codigo: z.string(),
  cliente: z.string(),
  cnpj: z.string(),
  usuario: z.string(),
  total: z.string(),
  etapa: z.string(),
  observacoes: z.string(),
  createdAt: z.string().datetime(),
});

export type OrcamentoTable = z.infer<typeof orcamento_table_schema>;
