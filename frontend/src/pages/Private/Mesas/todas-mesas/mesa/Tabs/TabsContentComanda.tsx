import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";

interface IProps {
  mesa: MesaValidator;
  value: string;
}

export const TabsContentComanda = ({ mesa, value }: IProps) => {
  return (
    <TabsContent value={value} className="h-[98%]">
      <Card className="h-full border-none shadow-inner">
        <ScrollArea className="h-full">
          <CardContent className="space-y-2 pt-6">
            {mesa.produtos.map((item) => (
              <div
                key={item.produto.id}
                className="flex items-center justify-between pr-3"
              >
                <div className="w-[80%] capitalize">
                  <p className="truncate font-bold tracking-wide">
                    {item.produto.nome.toLowerCase()}
                  </p>
                  <p className="truncate text-sm font-semibold tracking-wide opacity-70">
                    {item.produto.descricao.toLowerCase()}
                  </p>
                </div>
                <div>
                  <p>x {item.quantidade}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </TabsContent>
  );
};
