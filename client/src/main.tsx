
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
createRoot(document.getElementById("root")!).render(
  <div className={`flex justify-center items-center h-screen`}>

      <App />

  </div>,
);
