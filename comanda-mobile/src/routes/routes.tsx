import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { CardEsqueciMinhaSenha } from "@/pages/Public/CardEsqueciMinhaSenha/CardEsqueciMinhaSenha";
import { Login } from "@/pages/Public/Login/Login";
import { ErrorPage } from "@/pages/Public/404";
import { TodasMesas } from "@/pages/Private/Mesas/TodasMesas";
import { TodasComandas } from "@/pages/Private/Comandas/TodasComandas";
import { ComandaDetalhes } from "@/pages/Private/Comandas/comanda/ComandaDetalhes";

export const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
            children: [
              {
                path: "/login/esqueci-minha-senha",
                element: <CardEsqueciMinhaSenha />,
              },
            ],
          },
        ],
      },
    ],
  },

  // {
  //   path: "/dev",
  //   element: <DEVRoutes />,
  //   children: [
  //     {
  //       path: "/dev/teste",
  //       element: <Teste />,
  //     },
  //   ],
  // },

  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/mesas",
        children: [
          {
            path: "/mesas/todas-mesas",
            element: <TodasMesas />,
          },
        ],
      },
      {
        path: "/comandas",
        children: [
          {
            path: "/comandas/todas-comandas",
            element: <TodasComandas />,
          },
          {
            path: "/comandas/comanda/:id",
            element: <ComandaDetalhes />,
          },
        ],
      },
    ],
  },
]);
