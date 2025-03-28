import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addNode,
  discardSelection,
  removeNode,
  selectNode,
  setNodeCoordinates,
  setNodesIsActive,
} from "@/redux/GraphNodes/actionCreator.ts";

import {
  GraphNodeProps,
  GraphNode,
} from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { GraphEdge } from "@/components/GraphBuilder/GraphDisplay/GraphEdge.tsx";
import { isLiesBetween, movePoint, Point } from "../../../lib/types.ts";
import { RootState } from "../../../redux/store.ts";
import {
  addEdge,
  removeEdge,
  removeEdgesForNode,
  setEdgesIsActive,
} from "@/redux/GraphEdges/actionCreator.ts";
import {GraphBuilderTool} from "@/redux/GraphBuilder/actionTypes.ts";

interface GraphDisplayProps {
  
  className?: string;
}

const GraphDisplay = (props: GraphDisplayProps) => {
  //redux
  const dispatch = useDispatch();
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const selectedNodesArr = useSelector((state: RootState) => {
    return state.selectedGraphNodes;
  });
  const displaySettings =useSelector((state:RootState)=>state.displaySettings);
  const activeTool = useSelector((state: RootState) => state.graphBuilderTool.currentTool);

  const divRef = useRef<HTMLDivElement | null>(null);



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
      for (const id in nodeMap) {
        const node = nodeMap[id];
        if (
          isLiesBetween(
            clickCoords,
            node.coordinates,
            movePoint(node.coordinates, { x: displaySettings.nodeSize, y: displaySettings.nodeSize }),
          )
        ) {
          dispatch(selectNode(node));
          break;
        }
      }
    },
    [nodeMap, displaySettings.nodeSize],
  );

  const moveNodeHandler = useCallback(
    (e: MouseEvent) => {
      if (selectedNodesArr.length > 0) {
        const nodeId = selectedNodesArr[0].id;
        const coordinates = {
          x: e.offsetX - displaySettings.nodeSize / 2,
          y: e.offsetY - displaySettings.nodeSize / 2,
        };

        batch(() => {
          dispatch(setNodeCoordinates(nodeId, coordinates as Point));
          // dispatch(calculateEdgeProps({...selectedNodesArr[0], coordinates}));
          dispatch(discardSelection());
        });
      }
    },
    [selectedNodesArr],
  );

  const createNodeHandler = useCallback(
    (e: MouseEvent) => {
      const id = uuidv4().slice(0, 5);
      const dto: GraphNodeProps = {
        id,
        displayValue: `Node ${id}`, // Optional name for the node
        coordinates: {
          x: e.offsetX - displaySettings.nodeSize / 2,
          y: e.offsetY - displaySettings.nodeSize / 2,
        },
        radius: displaySettings.nodeSize,
        isActive: true,
        algorithmState: "primary",
      };
      dispatch(addNode(dto));
    },
    [activeTool],
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
  }, [activeTool, isRemovingNode, selectedNodesArr]);

  //addEdgeHandler
  const [isAddingEdge, setIsAddingAnEdge] = useState<boolean>(false);
  useEffect(() => {
    if (isAddingEdge) {
      if (selectedNodesArr.length >= 2) {
        const copy = structuredClone(selectedNodesArr);
        const nodeA = copy.shift() as GraphNodeProps;
        const nodeB = copy.shift() as GraphNodeProps;
        const id = `${nodeA.id}-${nodeB.id}`;
        const reverseId = `${nodeB.id}-${nodeA.id}`;
        const isDirected: boolean = activeTool === GraphBuilderTool.DIRECT_CONNECT;


        for (const edgeId in edgeMap) {
          if (isDirected) {
            if (edgeId === id) {
              dispatch(discardSelection());
              return;
            }
          } else {
            if (edgeId === id || reverseId === edgeId) {
              dispatch(discardSelection());
              return;
            }
          }
        }

        if (nodeA.id !== nodeB.id) {
          dispatch(
            addEdge({
              nodeAid: nodeA.id,
              nodeBid: nodeB.id,
              // displaySettings.nodeSize: displaySettings.nodeSize,
              width: 10,
              id,
              weight: 1,
              isActive: true,
              isDirected,
            }),
          );
        }
        else{
          dispatch(
            addEdge({
              nodeAid: nodeA.id,
              nodeBid: nodeB.id,
              // displaySettings.nodeSize: displaySettings.nodeSize,
              width: 10,
              id,
              weight: 1,
              isActive: true,
              isDirected,
            }),
          );
        }
        dispatch(discardSelection());
      }
    }
  }, [isAddingEdge, selectedNodesArr]);

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
        `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${activeTool}`,
      );
    },
    [activeTool],
  );

  // Attach and remove event listener on the parent div
  useEffect(() => {
    const divElement = divRef.current;
    if (activeTool === GraphBuilderTool.POINTER && divElement) {
      //pointer
      changeNodesActiveState(true);
    } else if (activeTool === GraphBuilderTool.CREATE && divElement) {
      divElement.addEventListener("click", createNodeHandler);
      changeNodesActiveState(true);
    } else if (activeTool === GraphBuilderTool.REMOVE && divElement && nodeMap) {
      setIsRemovingNode(true);
      changeNodesActiveState(false);
      divElement.addEventListener("click", selectionHandler);
    } else if (activeTool === GraphBuilderTool.MOVE && divElement && nodeMap) {
      changeNodesActiveState(false);
      divElement.addEventListener("click", moveNodeHandler);
      divElement.addEventListener("click", selectionHandler);
    } else if (
      (activeTool === GraphBuilderTool.CONNECT ||
        activeTool === GraphBuilderTool.DIRECT_CONNECT) &&
      divElement
    ) {
      changeNodesActiveState(false);
      setIsAddingAnEdge(true);
      divElement.addEventListener("click", selectionHandler);
    } else if (activeTool === GraphBuilderTool.DISCONNECT && divElement && edgeMap) {
      changeNodesActiveState(false);
      setIsRemovingAnEdge(true);
      divElement.addEventListener("click", selectionHandler);
    }else if (activeTool === GraphBuilderTool.PLAY_ANIMATION && divElement && edgeMap) {
      changeNodesActiveState(false);
      divElement.addEventListener("click", selectionHandler);
    }
    else if (activeTool && divElement) {
      divElement.addEventListener("click", handleEvent);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("click", createNodeHandler);
        divElement.removeEventListener("click", selectionHandler);
        divElement.removeEventListener("click", handleEvent);

        divElement.removeEventListener("click", moveNodeHandler);

        setIsAddingAnEdge(false);
        setIsRemovingNode(false);
        setIsRemovingAnEdge(false);
      }
    };
  }, [
    activeTool,
    selectedNodesArr.length,
    createNodeHandler,
    handleEvent,
  ]);

  // Render the GraphNodes based on the nodeMap

  const renderNodes = useMemo(() => {
    return Object.values(nodeMap).map((node) => {
      return selectedNodesArr.some(
        (selectedNode) => node.id === selectedNode.id,
      ) ? (
        <GraphNode key={node.id} {...node} algorithmState={"selected"} />
      ) : (
        <GraphNode key={node.id} {...node} />
      );
    });
  }, [nodeMap, selectedNodesArr]);

  const renderEdges = useMemo(() => {
    return Object.values(edgeMap).map((edge) => (
      <GraphEdge key={edge.id} {...edge} />
    ));
  }, [edgeMap, nodeMap]);
  return (
    <div className={`overflow-auto ${props.className} w-full h-full  relative `}  >
      {/* Render nodes dynamically */}
      {renderNodes}
      {renderEdges}
      <div className="relative w-full h-full bg-transparent" ref={divRef} />
    </div>
  );
};

export default GraphDisplay;
