import { usePdvApi } from "@/lib/axios/usePdvApi";
import { GerarCobrancaPixResponseValidator } from "@/utils/validators/Pix/gerar-cobranca";
import { useMutation } from "@tanstack/react-query";

export const useGerarCobrancaPix = () => {
  const { pdvApi } = usePdvApi();

  const gerarCobrancaPix = useMutation({
    mutationKey: ["gerar-cobranca-pix"],
    mutationFn: async (valor: string | number) => {
      const { data } = await pdvApi.post<GerarCobrancaPixResponseValidator>(
        "/pix/criar-cobranca-pix",
        {
          original: valor,
        },
      );

      return data;
    },
  });

  return { gerarCobrancaPix, ...gerarCobrancaPix };
};
