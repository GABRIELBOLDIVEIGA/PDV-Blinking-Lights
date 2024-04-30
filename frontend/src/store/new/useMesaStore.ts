import { ProdutoValidator } from "@/utils/validators/new/Produto/Produto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Item = {
  produto: ProdutoValidator;
  quantidade: number;
};

type Mesa = {
  mesa_id: number;
  prods: Item[];
};

type MesasStore = {
  mesas: Mesa[];
  addProduto: (
    mesa_id: number,
    produto: ProdutoValidator,
    quantidade: number,
  ) => void;

  resetMesa: (mesa_id: number) => void;

  mesaIdFocus: number;
  setMesaIdFocus: (id: number) => void;
  reset: () => void;
};

export const useMesasStore = create<MesasStore>()(
  persist(
    (set, get) => ({
      mesaIdFocus: 0,
      mesas: [],

      addProduto: (mesa_id, produto, quant) => {
        const mesa_existe = get().mesas.find((m) => m.mesa_id === mesa_id);

        if (!mesa_existe) {
          const mesa = {
            mesa_id,
            prods: [
              {
                produto: produto,
                quantidade: quant,
              },
            ],
          };

          set(() => ({ mesas: [mesa, ...get().mesas] }));
        }

        if (mesa_existe) {
          const produto_existe = mesa_existe.prods.find(
            (pro) => pro.produto.id === produto.id,
          );
          if (!produto_existe) {
            const produto_novo = {
              produto: produto,
              quantidade: quant,
            };

            const produtos_atualizados: Item[] = [
              produto_novo,
              ...mesa_existe.prods,
            ];
            mesa_existe.prods = produtos_atualizados;

            const mesas_atualizadas: Mesa[] = get().mesas.map((m) => {
              if (m.mesa_id != mesa_existe.mesa_id) {
                return m;
              } else {
                return {
                  mesa_id: m.mesa_id,
                  prods: produtos_atualizados,
                };
              }
            });

            set(() => ({ mesas: mesas_atualizadas }));
          } else {
            const prods: Item[] = mesa_existe.prods.map((p) => {
              if (p.produto.id != produto.id) {
                return p;
              } else {
                return {
                  produto: p.produto,
                  quantidade: quant,
                };
              }
            });
            const mesas_atualizada: Mesa[] = get().mesas.map((m) => {
              if (m.mesa_id != mesa_existe.mesa_id) {
                return m;
              } else {
                return {
                  mesa_id: mesa_existe.mesa_id,
                  prods,
                };
              }
            });

            set(() => ({ mesas: mesas_atualizada }));
          }
        }
      },

      setMesaIdFocus: (id: number) => {
        set(() => ({ mesaIdFocus: id }));
      },

      resetMesa: (id: number) => {
        set(() => ({
          mesas: get().mesas.filter((mesa) => mesa.mesa_id !== id),
        }));
      },

      reset: () => {
        set(() => ({ mesaIdFocus: 0 }));
      },
    }),

    {
      name: "pdv-mesa-selecionada",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
