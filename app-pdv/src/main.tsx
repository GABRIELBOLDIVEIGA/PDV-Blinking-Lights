import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routes/routeTree";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/tanstack-query/configs.tanstack-query";
import "./styles/global.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <>
        <ThemeProvider />
        <RouterProvider router={router} />
      </>
    </QueryClientProvider>
  </React.StrictMode>
);
