import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { Categorias } from "@/pages/private/categorias/categorias";

export const categoriasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categorias",
  component: () => <Categorias />,
});
