import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNode,
  discardSelection,
  removeNode,
  selectNode,
  setNodeCoordinates,
  setNodesIsActive,
} from "@/redux/GraphNodes/actionCreator.ts";
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
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../redux/store.ts";
import {
  addEdge,
  calculateEdgeProps,
  removeEdge,
  removeEdgesForNode,
  setEdgesIsActive,
} from "@/redux/GraphEdges/actionCreator.ts";

interface GraphDisplayProps {
  activeHandler: GraphBuilderActions;
}

const GraphDisplay = (props: GraphDisplayProps) => {
  //redux
  const dispatch = useDispatch();
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const selectedNodesArr = useSelector((state: RootState) => {
    return state.selectedGraphNodes;
  });

  const divRef = useRef<HTMLDivElement | null>(null);

  const [nodeSize, setNodeSize] = useState<number>(90);

  const changeNodesActiveState = (isActive: boolean) => {
    const divElement = divRef.current;
    dispatch(setNodesIsActive(isActive));
    dispatch(setEdgesIsActive(isActive)); //??????????
    divElement?.style.setProperty("z-index", isActive ? "30" : "50");
  };
  const isMouseDown = useRef(false);
  const mouseDownHandler = useCallback(() => {
    isMouseDown.current = true;
  }, []);
  const mouseUpHandler = useCallback(() => {
    isMouseDown.current = false;
  }, []);
  const setIsMouseDownListenerActive = (addMouseDragEvent: boolean) => {
    if (divRef) {
      const divElement = divRef.current!;
      if (addMouseDragEvent) {
        divElement.addEventListener("mousedown", mouseDownHandler);
        divElement.addEventListener("mouseup", mouseUpHandler);
      } else {
        divElement.removeEventListener("mousedown", mouseDownHandler);
        divElement.removeEventListener("mouseup", mouseUpHandler);
      }
    }
  };

  const selectionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const clickCoords = { x: e.offsetX, y: e.offsetY };
      for (const id in nodeMap) {
        const node = nodeMap[id];
        if (
          isLiesBetween(
            clickCoords,
            node.coordinates,
            movePoint(node.coordinates, { x: nodeSize, y: nodeSize }),
          )
        ) {
          dispatch(selectNode(node));

          break;
        }
      }
    },
    [nodeMap],
  );
  const isDraggingNode = useRef(false);
  const dragNodeHandler = useCallback(
    async (e: MouseEvent) => {
      if (isDraggingNode.current) {
        if (isMouseDown.current) {
          if (selectedNodesArr.length > 0) {
            dispatch(
              setNodeCoordinates(selectedNodesArr[0].id, {
                x: e.offsetX - nodeSize / 2,
                y: e.offsetY - nodeSize / 2,
              } as Point),
            );
            dispatch(calculateEdgeProps(selectedNodesArr[0]));
          }
        } else {
          dispatch(discardSelection());
        }
      }
    },
    [props.activeHandler, isDraggingNode.current, selectedNodesArr],
  );

  const createNodeHandler = useCallback(
    (e: MouseEvent) => {
      const id = uuidv4().slice(0, 5);
      const dto: GraphNodeProps = {
        id,
        name: `Node ${id}`, // Optional name for the node
        coordinates: {
          x: e.offsetX - nodeSize / 2,
          y: e.offsetY - nodeSize / 2,
        },
        radius: nodeSize,
        isActive: true,
      };
      dispatch(addNode(dto));
    },
    [props.activeHandler],
  );

  const [isRemovingNode, setIsRemovingNode] = useState<boolean>(false);
  useEffect(() => {
    if (isRemovingNode) {
      if (selectedNodesArr.length > 0) {
        dispatch(removeNode(selectedNodesArr[0].id));
        dispatch(removeEdgesForNode(selectedNodesArr[0].id));
        dispatch(discardSelection());
      }
    }
  }, [props.activeHandler, isRemovingNode, selectedNodesArr]);

  //addEdgeHandler
  const [isAddingAnEdge, setIsAddingAnEdge] = useState<boolean>(false);
  useEffect(() => {
    if (isAddingAnEdge) {
      if (selectedNodesArr.length >= 2) {
        const copy = structuredClone(selectedNodesArr);
        const nodeA = copy.shift() as GraphNodeProps;

        const nodeB = copy.shift() as GraphNodeProps;
        if (nodeA.id !== nodeB.id) {
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
        }
        dispatch(discardSelection());
      }
    }
  }, [isAddingAnEdge, selectedNodesArr]);

  const [isRemovingAnEdge, setIsRemovingAnEdge] = useState<boolean>(false);
  useEffect(() => {
    if (isRemovingAnEdge) {
      if (selectedNodesArr.length >= 2) {
        const copy = structuredClone(selectedNodesArr);
        const nodeA = copy.shift() as GraphNodeProps;

        const nodeB = copy.shift() as GraphNodeProps;

        if (nodeA.id !== nodeB.id) {
          dispatch(removeEdge(`${nodeA.id}-${nodeB.id}`));
        }
        dispatch(discardSelection());
      }
    }
  }, [isRemovingAnEdge, selectedNodesArr]);

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
      setIsMouseDownListenerActive(true);
      changeNodesActiveState(true);
    } else if (props.activeHandler === "create" && divElement) {
      divElement.addEventListener("click", createNodeHandler);
      changeNodesActiveState(true);
    } else if (props.activeHandler === "remove" && divElement && nodeMap) {
      setIsRemovingNode(true);
      changeNodesActiveState(false);
      divElement.addEventListener("click", selectionHandler);
    } else if (props.activeHandler === "test" && divElement && nodeMap) {
      //notemptyblocvk:)
    } else if (props.activeHandler === "disconnect" && divElement && edgeMap) {
      changeNodesActiveState(false);
      setIsRemovingAnEdge(true);
      divElement.addEventListener("click", selectionHandler);
    } else if (props.activeHandler === "drag" && divElement && nodeMap) {
      isDraggingNode.current = true;
      setIsMouseDownListenerActive(true);
      changeNodesActiveState(false);
      divElement.addEventListener("mousemove", dragNodeHandler);
      divElement.addEventListener("mousedown", selectionHandler);
    } else if (props.activeHandler === "connect" && divElement) {
      changeNodesActiveState(false);
      setIsAddingAnEdge(true);
      divElement.addEventListener("click", selectionHandler);
    } else if (props.activeHandler && divElement) {
      divElement.addEventListener("click", handleEvent);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("click", createNodeHandler);
        divElement.removeEventListener("click", selectionHandler);
        divElement.removeEventListener("click", handleEvent);
        divElement.removeEventListener("mousedown", selectionHandler);
        divElement.removeEventListener("mousemove", dragNodeHandler);
        setIsMouseDownListenerActive(false);
        isDraggingNode.current = false;
        setIsAddingAnEdge(false);
        setIsRemovingNode(false);
        setIsRemovingAnEdge(false);
        setIsMouseDownListenerActive(false);
      }
    };
  }, [
    props.activeHandler,
    isDraggingNode.current,
    isMouseDown.current,
    createNodeHandler,
    handleEvent,
  ]);

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
  }, [edgeMap, nodeMap]);
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
