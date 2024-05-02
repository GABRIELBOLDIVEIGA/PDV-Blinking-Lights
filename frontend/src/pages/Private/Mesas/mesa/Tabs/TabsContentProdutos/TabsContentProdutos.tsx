import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AccordionCategorias } from "./AccordionCategorias";
import { ProdutosTabsContent } from "./ProdutosTabsContent";

interface IProps {
  value: string;
}

export const TabsContentProdutos = ({ value }: IProps) => {
  return (
    <TabsContent value={value} className="h-full">
      <Card className="h-[98%] border-none shadow-inner">
        <CardContent className="h-full pt-6 mobile:px-4 mobile:pt-4">
          <Tabs defaultValue="todos" className="h-full overflow-y-clip">
            <AccordionCategorias />
            <ProdutosTabsContent />
          </Tabs>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
