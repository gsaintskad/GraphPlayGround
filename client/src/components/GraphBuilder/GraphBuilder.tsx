import GraphDisplay from "@/components/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import {
  discardAlgorithmState,
  discardNodeMap,
  discardSelection,
} from "@/redux/GraphNodes/actionCreator.ts";
import { discardEdgeMap } from "@/redux/GraphEdges/actionCreator.ts";
import ToolButton from "@/components/GraphBuilder/ToolButton.tsx";
import { useTheme } from "@/components/shadcnUI/ThemeProvider.tsx";
import { IconContext } from "react-icons";
import { IoMdSave, IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {
  TbArrowsMove,
  TbPointer,
  TbPointerMinus,
  TbPointerPlus,
} from "react-icons/tb";
import { BsArrowDownUp } from "react-icons/bs";
import { ImArrowUpRight2 } from "react-icons/im";
import { VscDebugDisconnect } from "react-icons/vsc";
import {
  setConnectTool,
  setCreateTool,
  setDirectConnectTool,
  setDisconnectTool,
  setMoveTool,
  setPlayAnimationTool,
  setPointerTool,
  setRemoveTool,
} from "@/redux/GraphBuilder/actionCreator.ts";
import { GraphBuilderTool } from "@/redux/GraphBuilder/actionTypes.ts";
import { Button } from "@/components/shadcnUI/button.tsx";
import { Label } from "@/components/shadcnUI/label.tsx";
import GraphBuilderTabs from "@/components/Tabs/GraphBuilderTabs.tsx";
import { saveGraph, NodeData, EdgeData } from "@/api/axios";

export const GraphBuilder = (props: {
  style: { width: string; height: string };
}) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const activeTool = useSelector(
    (state: RootState) => state.graphBuilderTool.currentTool
  );
  // Get auth state
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const theme = useTheme();
  const [isTabsHidden, setIsTabsHidden] = useState<boolean>(true);

  const backgroundGradient =
    theme.theme === "dark"
      ? "bg-gradient-to-br from-blue-800 via-teal-900 to-zinc-800"
      : "bg-gradient-to-br from-blue-300 via-purple-300 to-gray-200";

  const handleSaveGraph = async () => {
    // FIX: Removed localStorage check. Rely only on Redux state.
    if (!isAuthenticated) {
      alert("You must be logged in to save a graph.");
      return;
    }

    const nodesForApi: Record<string, NodeData> = {};
    Object.values(nodeMap).forEach((node) => {
      nodesForApi[node.id] = {
        id: node.id,
        displayValue: node.displayValue,
        x: node.coordinates.x,
        y: node.coordinates.y,
      };
    });

    const edgesForApi: Record<string, EdgeData> = {};
    Object.values(edgeMap).forEach((edge) => {
      edgesForApi[edge.id] = {
        id: edge.id,
        weight: edge.weight,
        isDirected: edge.isDirected!,
        nodeAid: edge.nodeAid,
        nodeBid: edge.nodeBid,
      };
    });

    const graphData = {
      nodes: nodesForApi,
      edges: edgesForApi,
    };

    try {
      // The cookie is handled automatically by the browser/proxy
      const response = await saveGraph(graphData);
      alert(`Graph saved successfully with ID: ${response.id}`);
    } catch (error: any) {
      console.error("Failed to save graph:", error);
      // Better error message handling
      const msg = error.response?.data?.message || "Failed to save graph.";
      alert(msg);
    }
  };

  // ... (Rest of the component remains exactly the same)
  return (
    <div
      className={`grid grid-rows-[auto_1fr] h-full w-full pb-10 px-10 ${backgroundGradient} text-white`}
      style={props.style}
    >
      <IconContext.Provider
        value={{
          color: theme.theme === "dark" ? "black" : "white",
          size: "2em",
        }}
      >
        <div className="flex h-16 gap-x-8 w-full items-center justify-center">
          <ToolButton
            name="Save Graph"
            description="Save the current graph"
            onClick={handleSaveGraph}
          >
            <IoMdSave />
          </ToolButton>

          <ToolButton
            name="Delete Graph"
            description="Delete the current graph"
            onClick={() => {
              dispatch(discardSelection());
              dispatch(discardNodeMap());
              dispatch(discardEdgeMap());
            }}
          >
            <MdDelete />
          </ToolButton>
          <ToolButton
            isAlwaysActive={true}
            name="Settings"
            description="Open graph settings"
            onClick={() => setIsTabsHidden(!isTabsHidden)}
          >
            <IoMdSettings />
          </ToolButton>
          <div>
            <Label
              className={theme.theme === "dark" ? "text-white" : "text-black"}
            >
              ACTIVE TOOL : {activeTool}
            </Label>

            <Button
              className="mx-6"
              onClick={() => {
                const state = activeTool === GraphBuilderTool.PLAY_ANIMATION;
                if (state) dispatch(discardAlgorithmState());
                dispatch(setPlayAnimationTool(!state));
              }}
            >
              toggle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[100px_1fr_auto] h-full">
          <div className="flex flex-col gap-y-4 items-center justify-center overflow-y-auto scrollbar-thin">
            <ToolButton
              name="Pointer"
              tool={GraphBuilderTool.POINTER}
              onClick={() => dispatch(setPointerTool())}
            >
              <TbPointer />
            </ToolButton>
            <ToolButton
              name="Move"
              tool={GraphBuilderTool.MOVE}
              onClick={() => dispatch(setMoveTool())}
            >
              <TbArrowsMove />
            </ToolButton>
            <ToolButton
              name="Create Node"
              tool={GraphBuilderTool.CREATE}
              onClick={() => dispatch(setCreateTool())}
            >
              <TbPointerPlus />
            </ToolButton>
            <ToolButton
              name="Delete Node"
              tool={GraphBuilderTool.REMOVE}
              onClick={() => dispatch(setRemoveTool())}
            >
              <TbPointerMinus />
            </ToolButton>
            <ToolButton
              name="Connect Nodes"
              tool={GraphBuilderTool.CONNECT}
              onClick={() => dispatch(setConnectTool())}
            >
              <BsArrowDownUp />
            </ToolButton>
            <ToolButton
              name="Direct Connect"
              tool={GraphBuilderTool.DIRECT_CONNECT}
              onClick={() => dispatch(setDirectConnectTool())}
            >
              <ImArrowUpRight2 />
            </ToolButton>
            <ToolButton
              name="Disconnect Nodes"
              tool={GraphBuilderTool.DISCONNECT}
              onClick={() => dispatch(setDisconnectTool())}
            >
              <VscDebugDisconnect />
            </ToolButton>
          </div>

          <GraphDisplay
            className={`rounded-xl  ${
              theme.theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
          />

          <GraphBuilderTabs isTabsHidden={isTabsHidden} />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default GraphBuilder;