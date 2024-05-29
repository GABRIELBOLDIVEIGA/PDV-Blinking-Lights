import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currencyFormt } from "@/helpers/currencyFormt";
import { useVendas } from "@/hooks/queries/vendas/useVendas.query";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

interface IProps {
  className?: string;
}

export const CardLucroBruto = ({ className }: IProps) => {
  const { data } = useVendas();
  const { currentValue, setFinalValue } = useCountUp();
  const [procentage, setPorcenagem] = useState(0);

  const calculaLucroTotal = () => {
    const lucroGeral = data?.map((venda) => {
      const lucroPorItem: number[] = venda.produtos?.map(
        (item) => item.produto.preco_venda - item.produto.preco_compra
      );

      return lucroPorItem.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    });

    const lucroCalculado = lucroGeral?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return lucroCalculado ? Number(lucroCalculado.toFixed(2)) : 0;
  };

  const calculaCustoVenda = () => {
    const lucroGeral = data?.map((venda) => {
      const lucroPorItem: number[] = venda.produtos?.map(
        (item) => item.produto.preco_compra
      );

      return lucroPorItem.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    });

    const lucroCalculado = lucroGeral?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return lucroCalculado ? Number(lucroCalculado.toFixed(2)) : 0;
  };

  useEffect(() => {
    setFinalValue(calculaLucroTotal());

    setPorcenagem(
      ((calculaLucroTotal() + calculaCustoVenda() - calculaCustoVenda()) /
        calculaCustoVenda()) *
        100
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-4 flex justify-between">
        <CardTitle className="text-sm">LUCRO BRUTO</CardTitle>
        <div className="flex pt-2 justify-between items-center">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-500">
            <TrendingUp size={32} />
          </div>
          <div className="font-bold text-xl">{currencyFormt(currentValue)}</div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-3 pt-2">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Venda líquida
          </p>
          <p className="font-semibold">
            R${" "}
            <CountUp
              start={0}
              end={calculaLucroTotal() + calculaCustoVenda()}
              duration={0.7}
            />
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Venda custo
          </p>
          <p className="font-semibold">
            R$ <CountUp start={0} end={calculaCustoVenda()} duration={0.7} />
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            % de lucro
          </p>
          <p className="font-semibold">
            <CountUp start={0} end={procentage} duration={0.7} /> %
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
