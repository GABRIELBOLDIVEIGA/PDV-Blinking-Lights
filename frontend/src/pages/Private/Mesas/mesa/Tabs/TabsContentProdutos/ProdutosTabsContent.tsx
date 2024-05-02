import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "@/components/Loader/Loader";
import { ProdutoParaAcicionar } from "./ProdutoParaAcicionar";
import { useProdutosQuery } from "@/hooks/queries/produtos/useProdutos.query";
import { useCategoriasQuery } from "@/hooks/queries/categorias/useCategorias.query";

export const ProdutosTabsContent = () => {
  const { data: produtos, isLoading: isLoadingProdutos } = useProdutosQuery();
  const { data: categorias, isLoading: isLoadingCategorias } =
    useCategoriasQuery();

  return (
    <section className="h-[90%]">
      <TabsContent value="todos" className="h-full">
        <ScrollArea className="h-[100%]">
          <div className="space-y-4 pb-32">
            {produtos?.map((produto) => (
              <ProdutoParaAcicionar key={produto.id} {...produto} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      {(isLoadingProdutos || isLoadingCategorias) && <Loader />}

      {categorias?.map((categoria) => (
        <TabsContent
          key={categoria.id}
          value={categoria.nome}
          className="h-full"
        >
          <ScrollArea className="h-[100%]">
            <div className="space-y-4 pb-32">
              {produtos?.map(
                (produto) =>
                  produto.categorias.find(
                    (cat) => cat.categoria.nome === categoria.nome,
                  ) && <ProdutoParaAcicionar key={produto.id} {...produto} />,
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </section>
  );
};
