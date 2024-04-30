import { MinusIcon, PlusIcon } from "lucide-react";
import { useProdutosQuery } from "@/hooks/new/queries/produtos/useProdutos.query";
import { useCategoriasQuery } from "@/hooks/new/queries/categorias/useCategorias.query";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader/Loader";
import { Input } from "@/components/ui/input";
import { ProdutoValidator } from "@/utils/validators/new/Produto/Produto";
import { useEffect, useState } from "react";
import { useMesasStore } from "@/store/new/useMesaStore";

export const ProdutoParaAcicionar = (produto: ProdutoValidator) => {
  const mesaId = useMesasStore((state) => state.mesaIdFocus);
  const addProduto = useMesasStore((state) => state.addProduto);
  const mesas = useMesasStore((state) => state.mesas);
  const [quantidade, setQuantidade] = useState<number>();

  const onClick = (qnt: number) => {
    quantidade ? setQuantidade(quantidade + qnt) : setQuantidade(1);
  };

  useEffect(() => {
    if (quantidade === 0) setQuantidade(undefined);

    if (quantidade) {
      addProduto(mesaId, produto, quantidade);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantidade]);

  useEffect(() => {
    const qnt = mesas
      .find((mesa) => mesa.mesa_id === mesaId)
      ?.prods.find((prod) => prod.produto.id === produto.id)?.quantidade;

    if (qnt) {
      setQuantidade(qnt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesas]);

  return (
    <div className="flex items-center justify-between pr-3">
      <div className="w-[65%] capitalize">
        <p className="truncate font-bold tracking-wide">
          {produto.nome.toLowerCase()}
        </p>
        <p className="truncate text-sm font-semibold tracking-wide opacity-70">
          {produto.descricao.toLowerCase()}
        </p>
      </div>

      <div className="flex h-full w-fit justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            onClick(-1);
          }}
          disabled={!quantidade || quantidade <= 0}
        >
          <MinusIcon className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>

        <Input
          className="w-12 text-center font-bold"
          placeholder="0"
          value={quantidade}
          type="number"
          onChange={(ev) => {
            if (ev.target.value === "") {
              setQuantidade(undefined);
            } else {
              setQuantidade(+ev.target.value);
            }
          }}
        />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            onClick(1);
          }}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );
};

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
          className="h-[69%]"
        >
          <ScrollArea className="h-[100%]">
            <div className="space-y-4">
              {produtos?.map(
                (produto) =>
                  produto.categorias.find(
                    (cat) => cat.categoria.nome === categoria.nome,
                  ) && (
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
                    </div>
                  ),
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </section>
  );
};
