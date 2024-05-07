import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useMutation } from "@tanstack/react-query";

export const useModificarSenha = () => {
  const { pdvApi } = usePdvApi();

  const editarSenha = useMutation({
    mutationKey: ["editar-senha"],
    mutationFn: async (form: {
      email: string;
      senha: string;
      novaSenha: string;
    }): Promise<{ token: string }> => {
      const { data } = await pdvApi.post<{ token: string }>(
        "/auth/change-password",
        form,
      );

      return data;
    },
  });

  return { editarSenha };
};
