import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { currencyFormt } from "./../../../helpers/currencyFormt";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect } from "react";
import { useVendas } from "@/hooks/queries/vendas/useVendas.query";
import { useTotalDeItensVendidos } from "@/hooks/queries/vendas/useTotalDeItensVendidos.query";
import CountUp from "react-countup";

interface IProps {
  className?: string;
}

export const CardTotalVendas = ({ className }: IProps) => {
  const { data } = useVendas();
  const { currentValue, setFinalValue } = useCountUp();
  const { totalDeItensVendidos } = useTotalDeItensVendidos();

  useEffect(() => {
    if (!data) return;

    const total_por_item = data?.map((item) => {
      const amount = item.produtos.map(
        (produto) => produto.produto.preco_venda * produto.quantidade
      );

      return amount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    });

    const total_geral = total_por_item?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    setFinalValue(Number(total_geral?.toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-4 flex justify-between">
        <CardTitle className="text-sm">TOTAL DE VENDAS</CardTitle>
        <div className="flex pt-2 justify-between items-center">
          {/* <div className="p-2 rounded-full bg-muted text-muted-foreground"> */}
          <div className="p-2 rounded-full bg-yellow-100 text-yellow-500">
            <CircleDollarSign size={32} />
          </div>
          <div className="font-bold text-xl">{currencyFormt(currentValue)}</div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-3 pt-2">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Qtd de vendas
          </p>
          <p className="font-semibold">
            <CountUp start={0} end={data?.length ?? 0} duration={0.7} />
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Ticket médio
          </p>
          <p className="font-semibold">
            R${" "}
            <CountUp
              start={0}
              end={currentValue / (data?.length ?? 1)}
              duration={0.7}
            />
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Itens vendidos
          </p>
          <p className="font-semibold">
            R${" "}
            <CountUp
              start={0}
              end={totalDeItensVendidos.data ?? 0}
              duration={0.7}
            />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
