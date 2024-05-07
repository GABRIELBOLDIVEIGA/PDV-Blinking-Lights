import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useMutation } from "@tanstack/react-query";

export const useEsqueciMinhaSenhaMutation = () => {
  const { pdvApi } = usePdvApi();

  const esqueciMinhaSenha = async (email: string): Promise<string> => {
    const { data } = await pdvApi.post<string>(`/auth/forgot-password`, {
      email: email,
    });
    return data;
  };

  const esqueciMinhaSenhaMutation = useMutation({
    mutationKey: ["esqueci_minha_senha_mutation"],
    mutationFn: esqueciMinhaSenha,
  });

  return { esqueciMinhaSenhaMutation };
};
