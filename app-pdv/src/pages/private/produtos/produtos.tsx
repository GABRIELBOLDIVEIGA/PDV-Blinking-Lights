import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import yaml from "js-yaml";

const useMesa = () => {
  const { pdvApi } = useApi();
  const { data, isPending } = useQuery({
    queryKey: ["sse"],
    queryFn: async () => {
      const { data } = await pdvApi.get("/mesa/sse/1");

      const obj = yaml.load(data);

      return obj;
    },
  });

  return { data, isPending };
};

export const Produtos = () => {
  const { data, isPending } = useMesa();

  useEffect(() => {
    console.log("[Data] => ", data);
    console.log("[isPending] => ", isPending);
  }, [data, isPending]);

  return <section>Produtos</section>;
};
