import { Card, CardContent } from "@/components/ui/card";
import { useMesasQuery } from "@/hooks/new/queries/mesas/useMesas.query";
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
import { AlignJustify, X } from "lucide-react";
import { useAbrirMesa } from "@/hooks/new/mutations/mesas/useAbrirMesa.mutation";
import { Loader } from "@/components/Loader/Loader";
import { queryClient } from "@/lib/react-query/queryClient";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProdutosQuery } from "@/hooks/new/queries/produtos/useProdutos.query";
import { useCategoriasQuery } from "@/hooks/new/queries/categorias/useCategorias.query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const TodasMesas = () => {
  const { data } = useMesasQuery();

  return (
    <section className="pt-6">
      <div className="flex cursor-pointer flex-wrap justify-center gap-6">
        {data?.map((mesa) => <Mesa key={mesa.id} {...mesa} />)}
      </div>
    </section>
  );
};

export const Mesa = (mesa: MesaValidator) => {
  const { mutate, isPending } = useAbrirMesa(mesa.id);
  const { data: produtos } = useProdutosQuery();
  const { data: categorias } = useCategoriasQuery();

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
      <DrawerTrigger asChild>
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
              <Button variant="ghost" size="icon">
                <AlignJustify size={18} />
              </Button>
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
                    <ScrollArea className="h-full">
                      <CardContent className="pt-6 mobile:px-4 mobile:pt-4">
                        <Tabs defaultValue="todos" className="">
                          {categorias && (
                            <>
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                              >
                                <AccordionItem value="item-1">
                                  <AccordionTrigger>
                                    Categorias
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <TabsList className="h-full mobile:h-[100px]">
                                      <ScrollArea className="mobile:h-[100px]">
                                        <div
                                          className={cn(
                                            "grid bg-muted px-2 py-1",
                                            `mobile:grid-cols-3 tablet:grid-cols-5 laptop:grid-cols-6 desktop:grid-cols-7`,
                                          )}
                                        >
                                          <TabsTrigger
                                            value="todos"
                                            className=""
                                          >
                                            <p className="truncate">Todos</p>
                                          </TabsTrigger>

                                          {categorias.map((categoria) => (
                                            <TabsTrigger
                                              key={categoria.id}
                                              className={cn("capitalize")}
                                              value={categoria.nome}
                                            >
                                              <p className="truncate">
                                                {categoria.nome.toLowerCase()}
                                              </p>
                                            </TabsTrigger>
                                          ))}
                                        </div>
                                      </ScrollArea>
                                    </TabsList>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                              <TabsContent value="todos">
                                <div>
                                  {produtos?.map((produto) => (
                                    <div key={produto.id}>{produto.nome}</div>
                                  ))}
                                </div>
                              </TabsContent>

                              {categorias?.map((categoria) => (
                                <TabsContent
                                  key={categoria.id}
                                  value={categoria.nome}
                                >
                                  <div>
                                    {produtos?.map((produto) => {
                                      const existe = produto.categorias.find(
                                        (cat) =>
                                          cat.categoria.nome === categoria.nome,
                                      );
                                      return existe ? (
                                        <div key={produto.id}>
                                          {produto.nome}
                                        </div>
                                      ) : (
                                        <></>
                                      );
                                    })}
                                  </div>
                                </TabsContent>
                              ))}
                            </>
                          )}
                        </Tabs>
                      </CardContent>
                    </ScrollArea>
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
