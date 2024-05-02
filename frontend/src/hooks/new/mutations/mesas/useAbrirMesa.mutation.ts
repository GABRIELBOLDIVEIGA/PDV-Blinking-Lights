import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { useMutation } from "@tanstack/react-query";

export const ABRIR_MESA_MUTATION_KEY = "abrir-mesa";

export const useAbrirMesa = (mesa_id: number) => {
  const { pdvApi } = usePdvApi();

  const abirMesa = useMutation({
    mutationKey: [ABRIR_MESA_MUTATION_KEY, mesa_id],
    mutationFn: async (id: number) => {
      const { data } = await pdvApi.patch<MesaValidator>(
        `/mesa/abrir-mesa/${id}`,
      );
      return data;
    },
  });

  return { abirMesa, ...abirMesa };
};
