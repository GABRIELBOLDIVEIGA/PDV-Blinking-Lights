import { rootRoute } from "./root";
import { loginRoute } from "./login";
import { produtosRoute } from "./produtos/produtos";
import { categoriasRoute } from "./categorias/categorias";

export const routeTree = rootRoute.addChildren([
  loginRoute,
  produtosRoute,
  categoriasRoute,
]);
