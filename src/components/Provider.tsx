"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const client = new QueryClient (); 

const Provider = ({ children }: { children: React.ReactNode }) => {

  return (
    <QueryClientProvider client={client}>
      { children }
    </QueryClientProvider>
  );

}

export default Provider;