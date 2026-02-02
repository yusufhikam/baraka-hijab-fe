"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type QueryClientProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: QueryClientProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
