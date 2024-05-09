import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export const CardProdutosMaisVendidos = ({ className }: IProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-sm">PRODUTOS MAIS VENDIDOS</CardTitle>
      </CardHeader>
    </Card>
  );
};
