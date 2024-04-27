import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAbrirMesa } from "@/hooks/new/mutations/mesas/useAbrirMesa.mutation";
import { Loader } from "@/components/Loader/Loader";
import { queryClient } from "@/lib/react-query/queryClient";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlignJustify, X } from "lucide-react";
import { ProdutosTabsContent } from "./ProdutosTabsContent";
import { AccordionCategorias } from "./AccordionCategorias";
import { useMesaStore } from "@/store/new/useMesaStore";
import { MenuMesa } from "./Menu";

export const Mesa = (mesa: MesaValidator) => {
  const { mutate, isPending } = useAbrirMesa(mesa.id);
  const setMesaId = useMesaStore((state) => state.setMesaId);

  const abrirMesa = () => {
    mutate(mesa.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === "todas-mesas",
        });
      },
      onError: (error) => {
        console.log("[Error] => ", error);
      },
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild onClick={() => setMesaId(mesa.id)}>
        <Card
          className={cn(
            "flex h-[100px] w-[100px] items-center justify-center border-none bg-muted",
            { "bg-primary text-primary-foreground": mesa.aberta },
          )}
        >
          <p
            className={cn("w-fit font-bold capitalize opacity-50", {
              "opacity-100": mesa.aberta,
            })}
          >
            {mesa.nome.toLowerCase()}
          </p>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="h-[90%]">
        <div className="h-full px-4 mobile:px-2">
          <DrawerHeader className="relative flex w-full justify-center">
            <div className="absolute left-0 top-0">
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={16} />
                </Button>
              </DrawerClose>
            </div>
            <div className="flex flex-col items-center">
              <DrawerTitle>{mesa.nome}</DrawerTitle>
            </div>
            <div className="absolute right-0 top-0">
              <MenuMesa>
                <Button variant="ghost" size="icon">
                  <AlignJustify size={18} />
                </Button>
              </MenuMesa>
            </div>
          </DrawerHeader>

          <div className="flex h-[90%] justify-center">
            {!mesa.aberta ? (
              <div className="flex flex-col items-center gap-4">
                <p>Mesa sem comanda, deseja abrir comanda para {mesa.nome}</p>
                <Button
                  className="space-x-2"
                  disabled={isPending}
                  onClick={abrirMesa}
                >
                  <p>Abrir Comanda</p> {isPending && <Loader size={18} />}
                </Button>
              </div>
            ) : (
              <Tabs
                defaultValue="comanda"
                className="mobile:w-full tablet:w-full laptop:w-3/4 desktop:w-1/2"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="comanda">Comanda</TabsTrigger>
                  <TabsTrigger value="produtos">Adicionar Produto</TabsTrigger>
                </TabsList>

                <TabsContent value="comanda" className="h-[98%]">
                  <Card className="h-full border-none shadow-inner">
                    <ScrollArea className="h-full">
                      <CardContent className="pt-6">
                        {mesa.produtos.map((produto) => (
                          <div key={produto.produto.id}>
                            <div className="flex gap-6">
                              <p className="">{produto.produto.nome}</p>
                              <p className="">x {produto.quantidade}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </ScrollArea>
                  </Card>
                </TabsContent>

                <TabsContent value="produtos" className="h-[98%]">
                  <Card className="h-full border-none shadow-inner">
                    <CardContent className="pt-6 mobile:px-4 mobile:pt-4">
                      <Tabs defaultValue="todos">
                        <AccordionCategorias />
                        <ProdutosTabsContent />
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
