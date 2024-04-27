import { useCategoriasQuery } from "@/hooks/new/queries/categorias/useCategorias.query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader } from "@/components/Loader/Loader";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AccordionCategorias = () => {
  const { data: categorias, isLoading: isLoadingCategorias } =
    useCategoriasQuery();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="categorias">
        <AccordionTrigger>Categorias</AccordionTrigger>
        <AccordionContent>
          {isLoadingCategorias ? (
            <Loader />
          ) : (
            <TabsList className="h-full w-full mobile:h-[100px]">
              <ScrollArea className="mobile:h-[100px]">
                <div className="grid bg-muted px-2 py-1 mobile:grid-cols-3 tablet:grid-cols-5 laptop:grid-cols-6 desktop:grid-cols-7">
                  <TabsTrigger value="todos">
                    <p className="truncate">Todos</p>
                  </TabsTrigger>

                  {categorias?.map((categoria) => (
                    <TabsTrigger
                      key={categoria.id}
                      className="capitalize"
                      value={categoria.nome}
                    >
                      <p className="truncate">{categoria.nome.toLowerCase()}</p>
                    </TabsTrigger>
                  ))}
                </div>
              </ScrollArea>
            </TabsList>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
