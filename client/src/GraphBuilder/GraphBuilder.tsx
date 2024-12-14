import { Button } from "@/components/ui/button";
import GraphDisplay from "@/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import { useMemo, useState } from "react";
import { GraphBuilderActions } from "./graphBuilderActions.ts";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { GraphEdgeProps } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import { BsArrowDownUp } from "react-icons/bs";
import { TbPointer, TbPointerMinus, TbPointerPlus } from "react-icons/tb";
import { ImArrowUpRight2 } from "react-icons/im";
import { IoIosMove, IoMdSave } from "react-icons/io";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import {
  discardNodeMap,
  discardSelection,
} from "@/redux/GraphNodes/actionCreator.ts";
import { discardEdgeMap } from "@/redux/GraphEdges/actionCreator.ts";

export const GraphBuilder = (props: {
  style: { width: string; height: string };
}) => {
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
  const dispatch = useDispatch();
  const adjMatrix = useMemo(() => {
    // Initialize an empty matrix
    const matrix: (GraphEdgeProps | null)[][] = Array(vertexes.length)
      .fill(null)
      .map(() => Array(vertexes.length).fill(null));

    // Populate the matrix based on edgeMap
    for (const id in edgeMap) {
      const edge = edgeMap[id];
      const fromIndex = vertexes.findIndex((node) => node.id === edge.nodeAid);
      const toIndex = vertexes.findIndex((node) => node.id === edge.nodeBid);

      if (fromIndex !== -1 && toIndex !== -1) {
        // Always set the connection from A to B
        matrix[fromIndex][toIndex] = edge;

        // If the edge is not directed, also set the connection from B to A
        if (!edge.isDirected) {
          matrix[toIndex][fromIndex] = edge;
        }
      }
    }

    return matrix;
  }, [vertexes, edgeMap]);

  const toggleHandler = (state: GraphBuilderActions) => {
    setActiveHandler(state);
  };

  return (
    <div className={`flex flex-col h-full w-full`}>
      <IconContext.Provider
        value={{ size: "3rem", color: "green", className: "global-class-name" }}
      >

        <div
          className={`bg-gray-950 h-12 flex justify-center items-center gap-8`}
        >
          <Button
            onClick={() =>
              console.log(
                "adjacency matrix:",
                adjMatrix,
                "\nvertexes:",
                vertexes,
              )
            }
          >
            <IoMdSave />
          </Button>
          <Button
            onClick={() => {
              dispatch(discardSelection());
              dispatch(discardNodeMap());
              dispatch(discardEdgeMap());
            }}
          >
            <MdDelete />
          </Button>
        </div>

        <div className={`bg-gray-700 h-full flex`} style={props.style}>
          <div
            className={`pt-10 flex flex-col h-full bg-gray-950 w-32 gap-8  gap-x-5
          //overflow-y-scroll
          `}
          >
            <Button className="h-10 w-10" onClick={() => toggleHandler("pointer")}>
              <TbPointer style={{ fontSize: "30px", width: "30px", height: "30px" }} />
            </Button>

            <Button className="h-10 w-10"  onClick={() => toggleHandler("move")}>
              <IoIosMove />
            </Button>
            <Button className="h-10 w-10" onClick={() => toggleHandler("create")}>
              <TbPointerPlus />
            </Button>
            <Button className="h-10 w-10" onClick={() => toggleHandler("remove")}>
              <TbPointerMinus />
            </Button>
            <Button className="h-10 w-10"  onClick={() => toggleHandler("connect")}>
              <BsArrowDownUp />
            </Button>
            <Button className="h-10 w-10"  onClick={() => toggleHandler("directConnect")}>
              <ImArrowUpRight2 />
            </Button>
            <Button className="h-10 w-10" onClick={() => toggleHandler("disconnect")}>
              <VscDebugDisconnect />
            </Button>
          </div>
          <GraphDisplay activeHandler={activeHandler} />
        </div>
      </IconContext.Provider>
    </div>
  );
};
