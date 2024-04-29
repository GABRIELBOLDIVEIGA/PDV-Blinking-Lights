import { StatusDaVenda } from '../enums/StatusDaVenda';

export type CreateVendaParams = {
  cliente_id: number | null;

  status: string;

  mesa_id: number | null;

  usuario_id: number;

  forma_de_pagamento_id: number;

  parcelas: number;

  observacoes: string;

  valor_total: number;

  desconto: number;

  valor_pago: number;
};
