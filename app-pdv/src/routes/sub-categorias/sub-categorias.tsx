import { SubCategorias } from "@/pages/private/sub-categorias/sub-categorias";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";

export const subCategoriasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subcategorias",
  component: () => <SubCategorias />,
});
