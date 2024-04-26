import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { useMutation } from "@tanstack/react-query";

export const useAbrirMesa = (mesa_id: number) => {
  const { pdvApi } = usePdvApi();

  const abirMesa = useMutation({
    mutationKey: ["abrir-mesa", mesa_id],
    mutationFn: async (id: number) => {
      const { data } = await pdvApi.patch<MesaValidator>(`/mesa/${id}`, {
        aberta: true,
      });
      return data;
    },
  });

  return { abirMesa, ...abirMesa };
};
