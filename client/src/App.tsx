import { GraphBuilder } from "./GraphBuilder/GraphBuilder.tsx";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div
        className={"flex items-center justify-center bg-gray-100 h-full w-full"}
      >

        <GraphBuilder style={{ height: "100%", width: "100%" }} />
      </div>
    </Provider>
  );
}

export default App;
