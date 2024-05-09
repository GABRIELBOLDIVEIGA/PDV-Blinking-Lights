import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import yaml from "js-yaml";
import { useState } from "react";
import { z } from "zod";

export const webhook_response_schema = z.object({
  status: z.boolean(),
  txid: z.string(),
});
type WebhookResponse = z.infer<typeof webhook_response_schema>;

export const useWebhookPix = () => {
  const [txid, setTxid] = useState<string>();

  const fetch = async (id: string | undefined): Promise<WebhookResponse> => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_AWS_WEBHOOK}/pix/aws/${id}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = yaml.load(data);

    if (webhook_response_schema.safeParse(obj.data).success) {
      return { status: obj.data.status ? true : false, txid: obj.data.txid };
    } else {
      console.warn(webhook_response_schema.safeParse(obj));
      return { status: false, txid: `${txid}` };
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ["webhook-pix", txid],
    queryFn: () => fetch(txid),
    enabled: !!txid,
  });
  return { data, isPending, setTxid };
};
