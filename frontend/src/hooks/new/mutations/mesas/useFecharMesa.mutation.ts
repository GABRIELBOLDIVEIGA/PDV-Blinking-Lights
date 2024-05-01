import { usePdvApi } from "@/lib/axios/new/usePdvApi";
import { useMutation } from "@tanstack/react-query";

export const useFecharMesa = () => {
  const { pdvApi } = usePdvApi();

  const fecharMesa = useMutation({
    mutationKey: ["fechar-mesa"],
    mutationFn: async (mesa_id: number) => {
      await pdvApi.patch(`mesa/fechar-mesa/${mesa_id}`);
    },
  });

  return { fecharMesa, ...fecharMesa };
};
