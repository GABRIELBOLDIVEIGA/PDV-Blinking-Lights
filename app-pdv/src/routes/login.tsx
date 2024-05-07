import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { Login } from "@/pages/public/login";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
