import { GraphBuilder } from "./components/GraphBuilder/GraphBuilder.tsx";

import HomePage from "@/components/HomePage/HomePage.tsx";
import NavigationBar from "@/components/NavigationBar/NavigationBar.tsx";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div
      className={"flex flex-col bg-background text-foreground h-[100vh]  self-center overflow-hidden"}
    >
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/GraphBuilder"
          element={<GraphBuilder style={{ height: "100%", width: "100%" }} />}
        />
        <Route path="/BTreeBuilder" element={<h1>b3builder</h1>} />
        <Route path="*" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
