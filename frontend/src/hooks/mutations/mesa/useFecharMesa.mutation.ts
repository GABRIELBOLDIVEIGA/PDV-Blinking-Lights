import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import { useMutation } from "@tanstack/react-query";

export const FECHAR_MESA_MUTATION_KEY = "fechar-mesa";

export const useFecharMesa = () => {
  const { pdvApi } = usePdvApi();

  const fecharMesa = useMutation({
    mutationKey: [FECHAR_MESA_MUTATION_KEY],
    mutationFn: async (mesa_id: number) => {
      await pdvApi.patch(`mesa/fechar-mesa/${mesa_id}`);
    },
  });

  return { fecharMesa, ...fecharMesa };
};
