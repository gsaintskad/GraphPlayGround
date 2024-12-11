import { Button } from "@/components/ui/button";
import GraphDisplay from "@/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import { useMemo, useState } from "react";
import { GraphBuilderActions } from "./graphBuilderActions.ts";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { GraphEdgeProps } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";

export const GraphBuilder = (props:{style:{width:string,height:string}}) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const [activeHandler, setActiveHandler] = useState<GraphBuilderActions>("");
  const vertexes = useMemo(() => {
    const arr: GraphNodeProps[] = [];
    for (const id in nodeMap) {
      arr.push(nodeMap[id]);
    }
    return arr;
  }, [nodeMap]);
  const adjMatrix = useMemo(() => {
    // Initialize an empty matrix
    const matrix: (GraphEdgeProps | null)[][] = Array(vertexes.length)
      .fill(null)
      .map(() => Array(vertexes.length).fill(null));

    // Populate the matrix based on edgeMap
    for (const id in edgeMap) {
      const edge = edgeMap[id];
      const fromIndex = vertexes.findIndex((node) => node.id === edge.nodeA.id);
      const toIndex = vertexes.findIndex((node) => node.id === edge.nodeB.id);

      if (fromIndex !== -1 && toIndex !== -1) {
        matrix[fromIndex][toIndex] = edge; // Connection from A to B
        matrix[toIndex][fromIndex] = edge; // Connection from B to A (if undirected)
      }
    }

    return matrix;
  }, [vertexes, edgeMap]);

  const toggleHandler = (state: GraphBuilderActions) => {
    setActiveHandler(state);
  };

  return (
    <div className={`flex flex-col h-full w-full`}>
      <div className={`bg-gray-950 h-12 flex justify-center items-center gap-8`}>
        <Button
          onClick={() =>
            console.log("adjacency matrix:", adjMatrix, "\nvertexes:", vertexes)
          }
        >
          save
        </Button>
      </div>

      <div className={`bg-gray-700 h-full flex`}
      style={props.style}>
        <div
          className={`pt-10 flex flex-col h-full bg-gray-950 w-32 gap-8  gap-x-5
          //overflow-y-scroll
          `}
        >
          <Button onClick={() => toggleHandler("pointer")}>pointer</Button>
          <Button onClick={() => toggleHandler("drag")}>drag</Button>
          <Button onClick={() => toggleHandler("create")}>create</Button>
          <Button onClick={() => toggleHandler("remove")}>remove</Button>
          <Button onClick={() => toggleHandler("connect")}>connect</Button>
          <Button onClick={() => toggleHandler("directConnect")}>direct connect</Button>
          <Button onClick={() => toggleHandler("disconnect")}>
            disconnect
          </Button>

        </div>
        <GraphDisplay activeHandler={activeHandler} />
      </div>
    </div>
  );
};
