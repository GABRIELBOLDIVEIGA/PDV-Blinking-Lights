import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { Produtos } from "@/pages/private/produtos/produtos";

export const produtosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/produtos",
  component: () => <Produtos />,
});
