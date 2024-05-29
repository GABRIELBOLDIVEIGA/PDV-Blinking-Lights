import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { currencyFormt } from "./../../../helpers/currencyFormt";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect } from "react";

interface IProps {
  className?: string;
}

export const CardTotalVendas = ({ className }: IProps) => {
  const { currentValue, setFinalValue } = useCountUp();

  useEffect(() => {
    setFinalValue(836.98);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <p className="font-semibold">{0}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Ticket médio
          </p>
          <p className="font-semibold">{currencyFormt(0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Itens vendidos
          </p>
          <p className="font-semibold">{0}</p>
        </div>
      </CardContent>
    </Card>
  );
};
