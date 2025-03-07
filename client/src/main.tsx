import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { ThemeProvider } from "@/components/shadcnUI/ThemeProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
);
