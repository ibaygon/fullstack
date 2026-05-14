import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreatePage } from "./pages/CreatePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";
import { ListDetailPage } from "./pages/ListDetailPage";
import { EditListPage } from "./pages/EditListPage";

import { AuthProvider } from "./context/AuthContext";
import { Top5Provider } from "./context/Top5Context";

export default function App() {
  return (
    <AuthProvider>
      <Top5Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/listas" element={<HomePage />} />
            <Route path="/crear" element={<CreatePage />} />
            <Route path="/lista/:id/edit" element={<EditListPage />} />
            <Route path="/lista/:id" element={<ListDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Top5Provider>
    </AuthProvider>
  );
}
