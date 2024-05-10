import { Card } from "@/components/ui/card";
import { useProdutos } from "@/hooks/queries/produtos/useProdutos.query";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategorias } from "@/hooks/queries/categoria/useCategorias.query";
import { useEffect, useState } from "react";
import { CardProduto } from "./card-produto";
import { ProdutoValidator } from "@/common/schemas/produto-schema";
import { X } from "lucide-react";
import { CardCarrinho } from "./card-carrinho";

export const Venda = () => {
  const { data } = useProdutos();
  const { data: categorias } = useCategorias();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [search, setSearch] = useState<string | undefined>("");
  const [produtos, setProdutos] = useState<ProdutoValidator[]>(data ?? []);

  const filtroPorCategoria = (item: ProdutoValidator) => {
    return !!item.categorias.find(
      (categoria) =>
        categoria.categoria.nome.toLowerCase() ===
        categoriaSelecionada.toLowerCase()
    );
  };

  const filtro = (str: string | undefined) => {
    const produtos_filtrados = data?.filter((produto) => {
      return (
        produto.nome.toLowerCase().includes(`${str?.toLocaleLowerCase()}`) ||
        produto.codigo.toLowerCase().includes(`${str?.toLocaleLowerCase()}`)
      );
    });
    setProdutos(produtos_filtrados ?? []);
  };

  useEffect(() => {
    filtro(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    setProdutos(data ?? []);
  }, [data]);

  return (
    <section>
      <div className="flex gap-4">
        <div className="flex relative items-center">
          <Input
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            className="w-80"
            placeholder="Nome ou código"
          />

          <X
            className="absolute right-2 text-muted-foreground cursor-pointer hover:text-primary hover:scale-105"
            size={20}
            onClick={() => setSearch("")}
          />
        </div>

        <Select onValueChange={(ev) => setCategoriaSelecionada(ev)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>

              <SelectItem value="todas">Todoas</SelectItem>

              {categorias?.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.nome}>
                  <div>{categoria.nome}</div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full pt-4 gap-4 h-[750px]">
        <Card className="gap-2 p-2 pr-1 w-2/3">
          <ScrollArea className="h-[720px]">
            <div className="gap-4 p-4 grid desktop:grid-cols-6 place-content-start laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2">
              {categoriaSelecionada === "todas" &&
                produtos?.map((item) => (
                  <CardProduto key={item.id} {...item} />
                ))}

              {categoriaSelecionada != "todas" &&
                produtos?.map(
                  (item) =>
                    filtroPorCategoria(item) && (
                      <CardProduto key={item.id} {...item} />
                    )
                )}
            </div>
          </ScrollArea>
        </Card>

        <CardCarrinho />
      </div>
    </section>
  );
};
