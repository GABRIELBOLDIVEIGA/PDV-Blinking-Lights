import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useMutation } from "@tanstack/react-query";
import { StatusComanda } from "@/utils/validators/Comanda/StatusComanda.enum";
import { z } from "zod";
import { FormaPagamento } from "@/utils/enums/FormaPagamento";

export const atualizaStatusComanda_schema = z.object({
  id: z.coerce.number(),
  status: z.nativeEnum(StatusComanda),
  forma_pagamento: z.nativeEnum(FormaPagamento),
});

export type AtualizaComandaStatus = z.infer<
  typeof atualizaStatusComanda_schema
>;

export const useAtualizaStatusComanda = () => {
  const { pdvApi } = usePdvApi();

  const atualizaStatusComanda = useMutation({
    mutationKey: ["atualiza-status-comanda"],
    mutationFn: async (form: AtualizaComandaStatus) => {
      const { data } = await pdvApi.patch(`/comandas/${form.id}`, {
        forma_pagamento: form.forma_pagamento,
        status: form.status,
      });

      return data;
    },
  });

  return { atualizaStatusComanda, ...atualizaStatusComanda };
};
