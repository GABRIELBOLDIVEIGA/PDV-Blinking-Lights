import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProdutoValidator } from "@/common/schemas/produto-schema";

export type CarrinhoStore = {
  carrinho: {
    produto: ProdutoValidator;
    qnt: number;
  }[];
  addProduto: (produto: ProdutoValidator, quantidade?: number) => void;
  removeProduto: (id: number) => void;
  editaQuandidade: (id: number, qnt: number) => void;
  total: () => number;
  reset: () => void;
};

export const useCarrinhoStore = create<CarrinhoStore>()(
  persist(
    (set, get) => ({
      carrinho: [],

      addProduto: (produto: ProdutoValidator, qnt?: number) => {
        if (get().carrinho.find((item) => item.produto.id === produto.id))
          return;

        set(() => ({
          carrinho: [...get().carrinho, { produto, qnt: qnt ?? 1 }],
        }));
      },

      removeProduto: (id: number) => {
        const filtro = get().carrinho.filter((item) => item.produto.id != id);

        set(() => ({ carrinho: filtro }));
      },

      editaQuandidade: (id: number, qnt: number) => {
        if (qnt < 0) {
          get().removeProduto(id);
          return;
        }

        const carrinho = get().carrinho.map((item) =>
          item.produto.id === id ? { produto: item.produto, qnt: qnt } : item
        );

        set(() => ({ carrinho }));
      },

      total: () => {
        const total_por_item = get().carrinho.map(
          (item) => item.produto.preco_venda * item.qnt
        );

        return total_por_item.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
      },

      reset: () => {
        set(() => ({ carrinho: [] }));
      },
    }),
    {
      name: "carrinho-pdv-blinking-lights",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
