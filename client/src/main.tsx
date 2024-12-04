import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import{Provider} from "react-redux";
import App from "./App.tsx";
import store from'./redux/store.ts'
createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <div className={`flex justify-center items-center h-screen`}>
        <Provider store={store}>

            <App />
        </Provider>
      </div>

  </StrictMode>,
);
