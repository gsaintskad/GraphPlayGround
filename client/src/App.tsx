import { GraphBuilder } from "./GraphBuilder/GraphBuilder.tsx";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";

function App() {
  return (
    <div
      className={"flex items-center justify-center bg-gray-100 h-full w-full"}
    >
      <Provider store={store}>
        <GraphBuilder style={{ height: "100%", width: "100%" }} />
      </Provider>
    </div>
  );
}

export default App;
