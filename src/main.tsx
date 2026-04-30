import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Top5Provider } from "./context/Top5Context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Top5Provider>
      <App />
    </Top5Provider>
  </StrictMode>
);
