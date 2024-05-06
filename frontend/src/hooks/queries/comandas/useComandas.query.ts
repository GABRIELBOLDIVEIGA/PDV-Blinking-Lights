import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useQuery } from "@tanstack/react-query";

export const useCobrancasPix = () => {
  const { pdvApi } = usePdvApi();

  const cobrancasPixQuery = useQuery({
    queryKey: ["cobrancas-pix"],
    queryFn: async () => {
      const { data } = await pdvApi.get(
        "/pix/cobrancas?inicio=2024-01-01T00%3A00%3A01Z&fim=2024-12-31T23%3A59%3A59Z",
      );

      return data;
    },
  });

  return { cobrancasPixQuery, ...cobrancasPixQuery };
};
