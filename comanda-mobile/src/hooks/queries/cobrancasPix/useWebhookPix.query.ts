import { usePdvApi } from "@/lib/axios/usePdvApi";
import { useQuery } from "@tanstack/react-query";
import yaml from "js-yaml";
import { useState } from "react";

export const useWebhookPix = () => {
  const [txid, setTxid] = useState<string>();
  const { pdvApi } = usePdvApi();

  const fetch = async ({ queryKey }) => {
    const { data } = await pdvApi.get(`/pix/docker/${queryKey[1]}`);

    const obj = yaml.load(data);

    return obj;
  };

  const { data, isPending } = useQuery({
    queryKey: ["webhook-pix", txid],
    queryFn: fetch,
    enabled: !!txid,
  });
  return { data, isPending, setTxid };
};
