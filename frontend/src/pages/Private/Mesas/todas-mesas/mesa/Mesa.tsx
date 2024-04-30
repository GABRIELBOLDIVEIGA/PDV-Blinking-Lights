import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAbrirMesa } from "@/hooks/new/mutations/mesas/useAbrirMesa.mutation";
import { Loader } from "@/components/Loader/Loader";
import { queryClient } from "@/lib/react-query/queryClient";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignJustify } from "lucide-react";
import { useMesasStore } from "@/store/new/useMesaStore";
import { MenuMesa } from "./Menu";
import { TabsContentComanda } from "./Tabs/TabsContentComanda";
import { TabsContentProdutos } from "./Tabs/TabsContentProdutos";
import { TabsContentPedido } from "./Tabs/TabsContentPedido";

export const Mesa = (mesa: MesaValidator) => {
  const { mutate, isPending } = useAbrirMesa(mesa.id);
  const setMesaId = useMesasStore((state) => state.setMesaIdFocus);

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
            "flex h-[100px] w-[100px] items-center justify-center border-none bg-muted  transition-all duration-1000",
            {
              "bg-primary text-primary-foreground ": mesa.aberta,
            },
          )}
        >
          <p
            className={cn("w-fit font-bold capitalize opacity-30", {
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
            <div className="flex flex-col items-center">
              <DrawerTitle>{mesa.nome}</DrawerTitle>
            </div>
            <div className="absolute right-0 top-2">
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="comanda">Comanda</TabsTrigger>
                  <TabsTrigger value="produtos">Produtos</TabsTrigger>
                  <TabsTrigger value="pedido">Pedido</TabsTrigger>
                </TabsList>

                <TabsContentComanda mesa={mesa} value="comanda" />

                <TabsContentProdutos value="produtos" />

                <TabsContentPedido value="pedido" />
              </Tabs>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
