import { rootRoute } from "./root";
import { loginRoute } from "./login";
import { produtosRoute } from "./produtos/produtos";
import { categoriasRoute } from "./categorias/categorias";
import { dashboardRoute } from "./dashboard/dashboard";

export const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  produtosRoute,
  categoriasRoute,
]);
