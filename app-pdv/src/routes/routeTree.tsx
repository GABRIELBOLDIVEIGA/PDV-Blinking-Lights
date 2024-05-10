import { rootRoute } from "./root";
import { loginRoute } from "./login";
import { produtosRoute } from "./produtos/produtos";
import { categoriasRoute } from "./categorias/categorias";
import { dashboardRoute } from "./dashboard/dashboard";
import { subCategoriasRoute } from "./sub-categorias/sub-categorias";
import { vendaRoute } from "./venda/venda";

export const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  produtosRoute,
  categoriasRoute,
  subCategoriasRoute,
  vendaRoute,
]);
