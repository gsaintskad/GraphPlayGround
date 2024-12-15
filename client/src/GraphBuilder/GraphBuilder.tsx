import { Button } from "@/components/shadcnUI/button";
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
import {IoIosMove, IoMdSave, IoMdSettings} from "react-icons/io";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import {
  discardNodeMap,
  discardSelection,
} from "@/redux/GraphNodes/actionCreator.ts";
import { discardEdgeMap } from "@/redux/GraphEdges/actionCreator.ts";
import InstrumentButton from "@/components/InstrumentButton.tsx";
import GraphBuilderSettingsSheet from "@/components/GraphBuilderSettingsSheet.tsx";

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
        value={{ size: "3rem", color: "#FFF", className: "global-class-name",style:{ fontSize: "3rem", width: "30px", height: "30px" } }}
      >

        <div
          className={`bg-gray-950 h-12 flex justify-center items-center gap-8 w-full`}
        >
          <InstrumentButton name="Save built graph" description="Saves and preparing the graph you've built, than sends it to the server to compute algorithms"
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
          </InstrumentButton>
          <InstrumentButton name="Delete built graph" description="Clears the graph display"
            onClick={() => {
              dispatch(discardSelection());
              dispatch(discardNodeMap());
              dispatch(discardEdgeMap());
            }}
          >
            <MdDelete />
          </InstrumentButton>

          {/*<GraphBuilderSettingsSheet>*/}
          {/*  <IoMdSettings/>*/}
          {/*</GraphBuilderSettingsSheet>*/}

        </div>

        <div className={`bg-gray-700 h-full flex`} style={props.style}>
          <div
            className={`pt-10 flex flex-col h-full bg-gray-950 px-2 gap-8  gap-x-5 w-16 justify-center items-center
          overflow-y-auto
          `}
          >

            <InstrumentButton name={'Pointer'} onClick={() => toggleHandler("pointer")}
                              description={'Just a simple pointer :)'}>
              <TbPointer/>
            </InstrumentButton>

            <InstrumentButton name="Move" description="Moves a node with its edges"
                              onClick={() => toggleHandler("move")}>
              <IoIosMove/>
            </InstrumentButton>
            <InstrumentButton name="Create" description="Creates new nodes and asings them ids"
                              onClick={() => toggleHandler("create")}>
              <TbPointerPlus/>
            </InstrumentButton>
            <InstrumentButton name="Remove" description="Removes a node with its edges"
                              onClick={() => toggleHandler("remove")}>
              <TbPointerMinus/>
            </InstrumentButton>
            <InstrumentButton name="Connection" description="Connects 2 nodes by clicking on it NOT directly"
                              onClick={() => toggleHandler("connect")}>
              <BsArrowDownUp/>
            </InstrumentButton>
            <InstrumentButton name="Direct Connection" description="Connects 2 nodes by clicking on it directly"
                              onClick={() => toggleHandler("directConnect")}>
              <ImArrowUpRight2/>
            </InstrumentButton>
            <InstrumentButton name="Disconnect" description="Disconnects 2 nodes by clicking on it"
                              onClick={() => toggleHandler("disconnect")}>
              <VscDebugDisconnect/>
            </InstrumentButton>
          </div>
          <GraphDisplay activeHandler={activeHandler}/>

        </div>
      </IconContext.Provider>
    </div>
  );
};
