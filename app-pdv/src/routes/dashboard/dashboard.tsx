import { Dashboard } from "@/pages/private/dashboard/dashboard";
import { rootRoute } from "../root";
import { createRoute } from "@tanstack/react-router";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <Dashboard />,
});
