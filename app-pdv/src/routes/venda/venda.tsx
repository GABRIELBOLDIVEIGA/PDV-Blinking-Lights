import { Venda } from "@/pages/private/venda/venda";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";

export const vendaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/venda",
  component: () => <Venda />,
});
