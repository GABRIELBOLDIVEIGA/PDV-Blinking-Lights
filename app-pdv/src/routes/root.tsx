import { Layout } from "@/pages/layout";
import { NotFound } from "@/pages/public/not-found";
import { createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
