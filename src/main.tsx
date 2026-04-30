import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Top5Provider } from "./context/Top5Context";

createRoot(document.getElementById("root")!).render(
  <Top5Provider>
    <App />
  </Top5Provider>
);
