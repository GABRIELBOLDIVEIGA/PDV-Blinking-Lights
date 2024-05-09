import { Loader } from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGerarCobrancaPix } from "@/hooks/mutations/pix/useGerarCobrancaPix";
import { useCountDown } from "@/hooks/useCountdown";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { millisecondsToMinutes } from "date-fns";
import { useAtualizaStatusComanda } from "@/hooks/mutations/comanda/useAtualizaStatusComanda";
import { ComandaValidator } from "@/utils/validators/Comanda/Comanda";
import { FormaPagamento } from "@/utils/enums/FormaPagamento";
import { StatusComanda } from "@/utils/validators/Comanda/StatusComanda.enum";
import { queryClient } from "@/lib/react-query/queryClient";
import { toast } from "sonner";
import { errorHandler } from "@/lib/axios/axiosErrorHandler";
import { useWebhookPix } from "@/hooks/queries/cobrancasPix/useWebhookPix.query";
import { cn } from "@/lib/utils";
import check from "@/assets/check-48.png";

interface IFooter {
  comanda: ComandaValidator;
}

export const Footer = ({ comanda }: IFooter) => {
  const {
    setTxid,
    data: webhookData,
    isPending: webhookIsPending,
  } = useWebhookPix();
  const {
    mutate: atualizaCoimandaMutate,
    isPending: atualizaComandaIsPending,
  } = useAtualizaStatusComanda();
  const { mutate, data, isPending } = useGerarCobrancaPix();
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const { time, setTime } = useCountDown(0, () => {}, 1000);

  useEffect(() => {
    const m = millisecondsToMinutes(time).toFixed();
    setMinutes(m);

    const s = time - +m * 60000;

    setSeconds(`${s / 1000}`);
  }, [time]);

  const gerarCobrancaPix = (valor: number) => {
    mutate(valor.toFixed(2), {
      onSuccess: (resp) => {
        setTxid(resp.txid);
        setTime(resp.calendario.expiracao * 1000);
      },
      onError: (error) => {
        toast.error(errorHandler(error)?.message);
      },
    });
  };

  const confirmaRecebimento = (forma_pagamento: FormaPagamento) => {
    atualizaCoimandaMutate(
      {
        id: comanda.id,
        status: StatusComanda.FECHADO,
        forma_pagamento: forma_pagamento,
      },
      {
        onSuccess: () => {
          toast.success("Confirmação de pagamento relalizada com sucesso.", {
            duration: 3000,
          });

          setTimeout(() => {
            queryClient.invalidateQueries({
              predicate: ({ queryKey }) =>
                queryKey[0] === "comanda" || queryKey[0] === "todas-comandas",
            });
          }, 1000);
        },
        onError: (error) => {
          toast.error(errorHandler(error)?.message);
        },
      },
    );
  };

  useEffect(() => {
    if (webhookData?.status) {
      setTimeout(() => {
        confirmaRecebimento(FormaPagamento.PIX);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webhookIsPending, webhookData]);

  return (
    <CardFooter className="flex flex-col px-2 pb-2">
      <Separator />
      <CardTitle className="w-full py-2 text-center">
        Forma de pagamento
      </CardTitle>

      <Tabs defaultValue={FormaPagamento.DINHEIRO} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value={FormaPagamento.DINHEIRO}>Dinheiro</TabsTrigger>
          <TabsTrigger value={FormaPagamento.CARTAO}>Cartào</TabsTrigger>
          <TabsTrigger value={FormaPagamento.PIX}>PIX</TabsTrigger>
        </TabsList>

        <TabsContent value={FormaPagamento.DINHEIRO}>
          <Card>
            <CardContent className="space-y-2 pt-6 text-center text-5xl font-semibold">
              {currencyFormt(comanda.total)}
            </CardContent>
            <CardFooter className="flex items-center justify-center py-3">
              <Button
                className="w-full"
                onClick={() => confirmaRecebimento(FormaPagamento.DINHEIRO)}
              >
                Confirmar Recebimento
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value={FormaPagamento.CARTAO}>
          <Card>
            <CardContent className="space-y-2 pt-6 text-center text-5xl font-semibold">
              {currencyFormt(comanda.total)}
            </CardContent>
            <CardFooter className="flex items-center justify-center py-3">
              <Button
                className="w-full"
                onClick={() => confirmaRecebimento(FormaPagamento.CARTAO)}
              >
                Confirmar Recebimento
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value={FormaPagamento.PIX}>
          <Card>
            <CardHeader className="flex items-end">
              <Button
                size="icon"
                onClick={() => gerarCobrancaPix(comanda.total)}
                disabled={webhookData?.status}
              >
                <QrCode size={18} />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-2">
              {isPending && (
                <Skeleton className="flex h-[228px] w-[228px] items-center justify-center">
                  <Loader />
                </Skeleton>
              )}

              {data && (
                <>
                  {!webhookData?.status && (
                    <div className="text-4xl font-bold tracking-wider ">
                      {+minutes < 10 ? `0${minutes}` : minutes}:
                      {+seconds < 10 ? `0${seconds}` : seconds}
                    </div>
                  )}
                  <div
                    className={cn(
                      "relative text-4xl font-bold tracking-wider transition-shadow duration-200",
                      {
                        "shadow-3xl shadow-green-300": webhookData?.status,
                      },
                    )}
                  >
                    {webhookData?.status && (
                      <div className=" absolute grid h-full w-full place-content-center">
                        <img src={check} className="w-24" />
                      </div>
                    )}
                    <img src={data?.imagemQrcode} />
                  </div>
                </>
              )}

              <CardContent className="space-y-2 pt-6 text-center text-5xl font-semibold">
                {currencyFormt(comanda.total)}
              </CardContent>
            </CardContent>
            <CardFooter className="flex items-center justify-center py-3">
              <Button
                className="w-full"
                disabled={!data || webhookData?.status}
                onClick={() => confirmaRecebimento(FormaPagamento.PIX)}
              >
                Confirmar Recebimento
                {atualizaComandaIsPending && <Loader size={16} />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </CardFooter>
  );
};
