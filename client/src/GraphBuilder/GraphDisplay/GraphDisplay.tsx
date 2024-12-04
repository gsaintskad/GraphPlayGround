import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNode, setNodesIsActive } from "@/redux/GraphNodes/actionCreator.ts";
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

  const [nodeSize, setNodeSize] = useState<number>(90);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [targetNode1, setTargetNode1] = useState<GraphNodeProps | null>(null);
  const [targetNode2, setTargetNode2] = useState<GraphNodeProps | null>(null);
  const changeNodesActiveState = (isActive: boolean) => {
    const divElement = divRef.current;
    dispatch(setNodesIsActive(isActive));
    dispatch(setEdgesIsActive(isActive)); //??????????
    divElement?.style.setProperty("z-index", isActive ? "30" : "50");
  };

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
  const addEdgeHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const clickCoords = { x: e.offsetX, y: e.offsetY };
      // Track selected nodes
      let selectedNode: GraphNodeProps | null = null;

      for (const id in nodeMap) {
        const node = nodeMap[id];
        if (
          isLiesBetween(
            clickCoords,
            node.coordinates,
            movePoint(node.coordinates, { x: nodeSize, y: nodeSize }),
          )
        ) {
          selectedNode = node;
          break;
        }
      }

      if (!selectedNode) {
        console.log("No node detected at click location:", clickCoords);
        return;
      }

      // Handle node selection logic
      if (!targetNode1) {
        setTargetNode1(() => selectedNode);
      } else if (targetNode1.id !== selectedNode.id) {
        setTargetNode2(() => selectedNode);
      } else {
        console.log(
          `Please choose another node! Node (${selectedNode.id}) is already selected as Target Node 1.`,
        );
      }
      if (targetNode1 && targetNode2) {
        dispatch(
          addEdge({
            nodeA: targetNode1,
            nodeB: targetNode2,
            nodeSize: nodeSize,
            width: 10,
            id: `${targetNode1.id}-${targetNode2}`,
            isActive: true,
          }),
        );
        console.log(
          `new edge connecting node${targetNode1.id} with node ${targetNode2.id} has been addded`,
        );
        setTargetNode1(() => null);
        setTargetNode2(() => null);
      }
    },
    [nodeMap, targetNode1, targetNode2],
  );

  // General handler for activeHandler-related events
  const handleEvent = useCallback(
    (e: MouseEvent) => {
      console.log(
        `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${props.activeHandler}`,
      );
    },
    [props.activeHandler],
  );
  useEffect(() => {
    console.log("actual tn1:", targetNode1, "\nactual tn2:", targetNode2);
  }, [targetNode1, targetNode2]);

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
      divElement.addEventListener("click", addEdgeHandler);
      changeNodesActiveState(false);
    } else if (props.activeHandler && divElement) {
      divElement.addEventListener("click", handleEvent);
      console.log(`Event listener added to div for ${props.activeHandler}`);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("click", createNodeHandler);
        divElement.removeEventListener("click", addEdgeHandler);
        divElement.removeEventListener("click", handleEvent);
        console.log("Event listeners removed");
      }
    };
  }, [props.activeHandler, createNodeHandler, handleEvent]);

  // Render the GraphNodes based on the nodeMap
  const renderNodes = () => {
    const nodeArr = [];
    for (const id in nodeMap) {
      nodeArr.push(<GraphNode key={id} {...nodeMap[id]} />);
    }
    return nodeArr;
  };
  const renderEdges = () => {
    const edgeArr = [];
    for (const id in edgeMap) {
      edgeArr.push(<GraphEdge key={id} {...edgeMap[id]} />);
    }
    return edgeArr;
  };
  return (
    <div className="relative w-full h-full">
      {/* Render nodes dynamically */}
      {renderNodes()}
      {renderEdges()}
      <div className="relative w-full h-full bg-transparent" ref={divRef} />
    </div>
  );
};

export default GraphDisplay;
