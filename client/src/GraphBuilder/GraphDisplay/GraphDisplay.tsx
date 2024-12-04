import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addNode, discardSelection, selectNode, setNodesIsActive} from "@/redux/GraphNodes/actionCreator.ts";
import { GraphBuilderActions } from "@/GraphBuilder/graphBuilderActions.ts";
import {
  GraphNodeProps,
  GraphNode,
} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { GraphEdge } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import {
  isLiesBetween,
  movePoint,
  Point,
  stateObject,
} from "../../../types.ts";

import { Reducer } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store.ts";
import { addEdge, setEdgesIsActive } from "@/redux/GraphEdges/actionCreator.ts";

interface GraphDisplayProps {
  activeHandler: GraphBuilderActions;
}

const GraphDisplay = (props: GraphDisplayProps) => {
  //redux
  const dispatch = useDispatch();
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const selectedNodesArr = useSelector(
    (state: RootState) => state.selectedGraphNodes,
  );

  const [nodeSize, setNodeSize] = useState<number>(90);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isAddingAnEdge, setIsAddingAnEdge] = useState<boolean>(false);

  const changeNodesActiveState = (isActive: boolean) => {
    const divElement = divRef.current;
    dispatch(setNodesIsActive(isActive));
    dispatch(setEdgesIsActive(isActive)); //??????????
    divElement?.style.setProperty("z-index", isActive ? "30" : "50");
  };
  const selectionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const clickCoords = { x: e.offsetX, y: e.offsetY };
      // Track selected nodes
      console.log(clickCoords,nodeMap);
      for (const id in nodeMap) {
        const node = nodeMap[id];
          if(isLiesBetween(clickCoords, node.coordinates, movePoint(node.coordinates, { x: nodeSize, y: nodeSize }))) {

              if(!selectedNodesArr.some((selectedNode)=>node.id===selectedNode.id)) {

                  dispatch(selectNode(node));
                  break;
              }
          }
      }
      //coincidence check might be here
    },
    [nodeMap],
  );

  const createNodeHandler = useCallback(
    (e: MouseEvent) => {
      const dto: GraphNodeProps = {
        id: Math.random().toString(),
        name: `Node ${Math.random() + 1}`, // Optional name for the node
        coordinates: {
          x: e.offsetX - nodeSize / 2,
          y: e.offsetY - nodeSize / 2,
        },
        radius: nodeSize,
        isActive: true,
      };
      dispatch(addNode(dto));

      console.log(
        `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${props.activeHandler}`,
      );
    },
    [props.activeHandler],
  );
  //addEdgeHandler
  useEffect(() => {
    if (isAddingAnEdge) {
      if (selectedNodesArr.length >=2) {
        const copy = structuredClone(selectedNodesArr);
        const nodeA = copy.shift() as GraphNodeProps;
        const nodeB = copy.shift() as GraphNodeProps;
        dispatch(
          addEdge({
            nodeA,
            nodeB,
            nodeSize: nodeSize,
            width: 10,
            id: `${nodeA.id}-${nodeB.id}`,
            isActive: true,
          }),
        );
        dispatch(discardSelection());
      }
    }
  }, [selectedNodesArr]);

  // General handler for activeHandler-related events
  const handleEvent = useCallback(
    (e: MouseEvent) => {
      console.log(
        `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${props.activeHandler}`,
      );
    },
    [props.activeHandler],
  );

  // Attach and remove event listener on the parent div
  useEffect(() => {
    const divElement = divRef.current;
    if (props.activeHandler === "pointer" && divElement) {
      //pointer
      changeNodesActiveState(true);
    } else if (props.activeHandler === "create" && divElement) {
      divElement.addEventListener("click", createNodeHandler);
      changeNodesActiveState(true);
      console.log("CreateNodeHandler added");
    } else if (props.activeHandler === "connect" && divElement) {
      changeNodesActiveState(false);
      setIsAddingAnEdge(true);
      divElement.addEventListener("click", selectionHandler);
    } else if (props.activeHandler && divElement) {
      divElement.addEventListener("click", handleEvent);
      console.log(`Event listener added to div for ${props.activeHandler}`);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("click", createNodeHandler);
        divElement.removeEventListener("click", selectionHandler);
        divElement.removeEventListener("click", handleEvent);
        if (props.activeHandler === "connect") setIsAddingAnEdge(false);
        console.log("Event listeners removed");
      }
    };
  }, [props.activeHandler, createNodeHandler, handleEvent]);

  // Render the GraphNodes based on the nodeMap
  const renderNodes = useMemo(() => {
    return Object.values(nodeMap).map((node) => (
      <GraphNode key={node.id} {...node} />
    ));
  }, [nodeMap]);

  const renderEdges = useMemo(() => {
    return Object.values(edgeMap).map((edge) => (
      <GraphEdge key={edge.id} {...edge} />
    ));
  }, [edgeMap]);
  return (
    <div className="relative w-full h-full">
      {/* Render nodes dynamically */}
      {renderNodes}
      {renderEdges}
      <div className="relative w-full h-full bg-transparent" ref={divRef} />
    </div>
  );
};

export default GraphDisplay;
