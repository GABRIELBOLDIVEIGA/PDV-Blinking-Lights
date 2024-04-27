import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MesaStore = {
  mesaId: number | null;
  setMesaId: (id: number) => void;
  reset: () => void;
};

export const useMesaStore = create<MesaStore>()(
  persist(
    (set) => ({
      mesaId: null,

      setMesaId: (id: number) => {
        set(() => ({ mesaId: id }));
      },

      reset: () => {
        set(() => ({ mesaId: null }));
      },
    }),

    {
      name: "pdv-mesa-selecionada",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
