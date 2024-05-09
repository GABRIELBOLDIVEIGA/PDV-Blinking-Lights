import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currencyFormt } from "@/helpers/currencyFormt";

import { cn } from "@/lib/utils";
import { Boxes } from "lucide-react";

interface IProps {
  className?: string;
}

export const CardEstoqueTotal = ({ className }: IProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="p-4 flex justify-between">
        <CardTitle className="text-sm">ESTOQUE TOTAL</CardTitle>
        <div className="flex pt-2 justify-between items-center">
          <div className="p-2 rounded-full bg-muted text-muted-foreground">
            <Boxes size={32} />
          </div>
          <div className="font-bold text-xl">{currencyFormt(0)}</div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-3 pt-2">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Estoque custo
          </p>
          <p className="font-semibold">{0}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Estoque venda
          </p>
          <p className="font-semibold">{currencyFormt(0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground font-semibold text-sm tracking-wide">
            Lucro estimado
          </p>
          <p className="font-semibold">{0}</p>
        </div>
      </CardContent>
    </Card>
  );
};
