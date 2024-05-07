import { Cabecalho } from "@/components/Cabecalho/Cabecalho";
import { GridBackground } from "@/components/GridBackground/GridBackground";
import { Main } from "@/components/Main/Main";
import RequireAuth from "@/context/Auth/RequireAuth";
import { Socket } from "../components/Socket/Socket";

export const PrivateRoutes = () => {
  return (
    <RequireAuth>
      <>
        <Socket />
        <GridBackground>
          <div className="h-screen">
            <Cabecalho />
            <Main />
          </div>
        </GridBackground>
      </>
    </RequireAuth>
  );
};
