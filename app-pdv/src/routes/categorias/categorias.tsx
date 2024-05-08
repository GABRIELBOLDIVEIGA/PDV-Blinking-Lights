import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";

export const categoriasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categorias",
  component: () => <div>Hello /categorias/categorias!</div>,
});
