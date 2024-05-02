import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { useMesasStore } from "@/store/useMesaStore";
import { Button } from "@/components/ui/button";
import { AlertConfirmarPedido } from "./AlertConfirmarPedido";

interface IProps {
  value: string;
}

export const TabsContentPedido = ({ value }: IProps) => {
  const mesas = useMesasStore((state) => state.mesas);
  const mesaIdFocus = useMesasStore((state) => state.mesaIdFocus);

  return (
    <TabsContent value={value} className="h-[98%]">
      <Card className="h-full border-none shadow-inner">
        <CardContent className="h-full pt-6 mobile:px-4 mobile:pt-4">
          <ScrollArea className="relative h-[100%]">
            <div className="space-y-2 pb-12">
              {mesas.map(
                (mesa) =>
                  mesa.mesa_id === mesaIdFocus &&
                  mesa.prods.map((item) => (
                    <div
                      key={item.produto.id}
                      className="flex items-center justify-between pr-3"
                    >
                      <div className="w-[80%] capitalize">
                        <p className="truncate font-bold tracking-wide">
                          {item.produto.nome}
                        </p>
                        <p className="truncate text-sm font-semibold tracking-wide opacity-70">
                          {item.produto.descricao}
                        </p>
                      </div>
                      <div>
                        <p>x {item.quantidade}</p>
                      </div>
                    </div>
                  )),
              )}
            </div>
            <div className="absolute bottom-0 flex w-full items-center justify-center">
              <AlertConfirmarPedido>
                <Button
                  className="w-full"
                  disabled={
                    mesas.find((mesa) => mesa.mesa_id === mesaIdFocus)?.prods
                      .length
                      ? false
                      : true
                  }
                >
                  Confirmar Pedido
                </Button>
              </AlertConfirmarPedido>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
