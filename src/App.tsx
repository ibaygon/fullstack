
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreatePage } from "./pages/CreatePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ListView } from "./components/ListView";
import { LoginPage } from "./pages/LoginPage";
import { supabase } from "./lib/supabase";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    supabase.auth.getUser().then(console.log);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/crear" element={<CreatePage />} />
        <Route path="/listas" element={<ListView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
