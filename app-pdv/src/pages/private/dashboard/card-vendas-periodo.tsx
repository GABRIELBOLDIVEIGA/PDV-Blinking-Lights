import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export const CardVendasPeriodo = ({ className }: IProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-sm">VENDAS NO PERÍODO</CardTitle>
      </CardHeader>
    </Card>
  );
};
