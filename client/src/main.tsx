
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
createRoot(document.getElementById("root")!).render(

<Router>
      <App />

</Router>


);
