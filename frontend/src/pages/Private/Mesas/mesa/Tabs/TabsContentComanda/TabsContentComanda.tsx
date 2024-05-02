import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { AlertFecharComanda } from "./AlertFecharComanda";
import { MesaValidator } from "@/utils/validators/Mesa/Mesa";
import { ItemComanda } from "./ItemComanda";

interface ITabsContentComandaProps {
  mesa: MesaValidator;
  value: string;
}

export const TabsContentComanda = ({
  mesa,
  value,
}: ITabsContentComandaProps) => {
  return (
    <TabsContent value={value} className="h-[98%]">
      <Card className="relative h-full border-none pb-16 shadow-inner">
        <ScrollArea className="h-full">
          <CardContent className="space-y-2 pr-2 pt-6">
            {mesa.comanda?.produtos.map((item, index) => (
              <ItemComanda {...item} key={index} />
            ))}
          </CardContent>
        </ScrollArea>
        <AlertFecharComanda mesa_id={mesa.id}>
          <Button className="absolute bottom-5 w-full">Fechar Comanda</Button>
        </AlertFecharComanda>
      </Card>
    </TabsContent>
  );
};
