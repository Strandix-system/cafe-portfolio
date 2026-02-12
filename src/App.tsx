import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutProvider } from "./context/LayoutContext";
import MyOrders from "./pages/MyOrders";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const createEmotionCache = (direction = "ltr") =>
  createCache({
    key: direction === "rtl" ? "muirtl" : "muiltr",
    stylisPlugins: direction === "rtl" ? [rtlPlugin] : [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  });

const emotionCache = createEmotionCache("ltr");

export default function App() {
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/:layoutId/:qrId?" element={<LayoutProvider> <Index /> </LayoutProvider>} />
                <Route
                  path="/cafe/:layoutId/*"
                  element={
                    <LayoutProvider>
                      <Index />
                    </LayoutProvider>
                  }
                />
                <Route
                  path="/:layoutId/:qrId?/my-orders"
                  element={
                    <LayoutProvider>
                      <MyOrders />
                    </LayoutProvider>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster position="top-right" reverseOrder={false} />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
