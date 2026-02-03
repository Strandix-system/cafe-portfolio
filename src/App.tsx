
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import Toaster from "react-hot-toast";

import { Toaster } from "react-hot-toast";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    // stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};


const App = () => (
//  <CacheProvider value={createCache(emotionCacheOptions.ltr)}>
      
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={0}>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
  // </CacheProvider>
);

export default App;
