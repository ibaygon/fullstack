import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Top5Provider } from "./context/Top5Context";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Top5Provider>
      <App />
    </Top5Provider>
  </AuthProvider>
);
