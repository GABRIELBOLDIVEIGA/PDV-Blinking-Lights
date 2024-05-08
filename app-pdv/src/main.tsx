import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";

import { routeTree } from "./routes/routeTree";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

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
