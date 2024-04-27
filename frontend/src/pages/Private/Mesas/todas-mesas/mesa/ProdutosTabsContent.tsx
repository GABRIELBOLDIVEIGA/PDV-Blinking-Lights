import { Plus } from "lucide-react";
import { useProdutosQuery } from "@/hooks/new/queries/produtos/useProdutos.query";
import { DialogAddProduto } from "./DialogAddProduto";
import { useCategoriasQuery } from "@/hooks/new/queries/categorias/useCategorias.query";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader/Loader";

export const ProdutosTabsContent = () => {
  const { data: produtos, isLoading: isLoadingProdutos } = useProdutosQuery();
  const { data: categorias, isLoading: isLoadingCategorias } =
    useCategoriasQuery();

  return (
    <section className="h-screen">
      <TabsContent value="todos" className="h-[69%]">
        <ScrollArea className="h-[100%]">
          <div className="space-y-4">
            {produtos?.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between pr-3"
              >
                <div className="w-[80%] capitalize">
                  <p className="truncate font-bold tracking-wide">
                    {produto.nome.toLowerCase()}
                  </p>
                  <p className="truncate text-sm font-semibold tracking-wide opacity-70">
                    {produto.descricao.toLowerCase()}
                  </p>
                </div>
                <DialogAddProduto produto={produto}>
                  <Button size="icon" variant="default">
                    <Plus size={18} />
                  </Button>
                </DialogAddProduto>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      {(isLoadingProdutos || isLoadingCategorias) && <Loader />}

      {categorias?.map((categoria) => (
        <TabsContent
          key={categoria.id}
          value={categoria.nome}
          className="h-[69%]"
        >
          <ScrollArea className="h-[100%]">
            {produtos?.map(
              (produto) =>
                produto.categorias.find(
                  (cat) => cat.categoria.nome === categoria.nome,
                ) && (
                  <div key={produto.id}>
                    <p>{produto.nome}</p>
                    <p>{produto.descricao}</p>
                  </div>
                ),
            )}
          </ScrollArea>
        </TabsContent>
      ))}
    </section>
  );
};
