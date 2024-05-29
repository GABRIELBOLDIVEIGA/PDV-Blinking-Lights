import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currencyFormt } from "@/helpers/currencyFormt";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { useEffect } from "react";

interface IProps {
  className?: string;
}

export const CardLucroBruto = ({ className }: IProps) => {
  const { currentValue, setFinalValue } = useCountUp();

  useEffect(() => {
    setFinalValue(3754.34);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-4 flex justify-between">
        <CardTitle className="text-sm">LUCRO BRUTO</CardTitle>
        <div className="flex pt-2 justify-between items-center">
          {/* <div className="p-2 rounded-full bg-muted text-muted-foreground"> */}
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
          <p className="font-semibold">{currencyFormt(0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Venda custo
          </p>
          <p className="font-semibold">{currencyFormt(0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            % de lucro
          </p>
          <p className="font-semibold">{0} %</p>
        </div>
      </CardContent>
    </Card>
  );
};
