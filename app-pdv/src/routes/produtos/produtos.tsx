import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";

export const produtosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/produtos",
  component: () => <div>produtos</div>,
});
