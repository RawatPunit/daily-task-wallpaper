
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotesPage from "./pages/NotesPage";
import WallpaperPage from "./pages/WallpaperPage";
import NotFound from "./pages/NotFound";
import { NotesProvider } from "./context/NotesContext";

const queryClient = new QueryClient();

// Add framer-motion for animations
import { AnimatePresence } from "framer-motion";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/wallpaper" element={<WallpaperPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </NotesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
