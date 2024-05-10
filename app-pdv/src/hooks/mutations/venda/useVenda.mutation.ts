import { useApi } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { RealizarVendaForm } from "./realizar-venda-schema";

export const VENDA_MUTATION_KEY = "venda";

export const useRealizarVenda = () => {
  const { pdvApi } = useApi();

  const vendaMutation = useMutation({
    mutationKey: [VENDA_MUTATION_KEY],
    mutationFn: async (form: RealizarVendaForm) => {
      const { data } = await pdvApi.post("/venda", form);

      return data;
    },
  });

  return { vendaMutation, ...vendaMutation };
};
