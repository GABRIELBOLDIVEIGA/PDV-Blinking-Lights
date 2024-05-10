import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { AuthValidator, authSchema } from "@/common/schemas/auth-schema";

export type AuthStore = {
  user: AuthValidator;
  access_token: string | null;
  setToken: (access_token: string) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      setToken: (token: string) => {
        const decoded = jwtDecode<AuthValidator>(token);

        if (authSchema.safeParse(decoded).success) {
          set(() => ({ access_token: token, user: decoded }));
        } else {
          console.warn("[Data] => ", decoded);
          console.warn("[Error] => ", authSchema.safeParse(decoded));
          set(() => ({ user: null, access_token: null }));
        }
      },

      reset: () => {
        set(() => ({ user: null, access_token: null }));
      },
    }),
    {
      name: "auth-pdv-blinking-lights",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
