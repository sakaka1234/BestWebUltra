import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/react-query";
import { Toaster } from "react-hot-toast";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        {children}
      </QueryClientProvider>
    </>
  );
};