import {GraphBuilder} from "./GraphBuilder/GraphBuilder.tsx";


function App() {
  return (
    <div className={"flex items-center justify-center bg-gray-100"}>

        <GraphBuilder style={{ height: "70vh", width: "70vw" }}/>
    </div>
  );
}

export default App;
