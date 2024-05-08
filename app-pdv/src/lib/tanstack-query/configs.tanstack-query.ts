import { QueryClient } from "@tanstack/react-query";

// 60_000 milliseconds  = 1 minutes
const milliseconds = 60_000 * 15;

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: milliseconds } },
});
