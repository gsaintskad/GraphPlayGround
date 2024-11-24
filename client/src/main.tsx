import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <div className={`flex justify-center items-center h-screen`}>

        <App />
      </div>

  </StrictMode>,
);
