import GraphDisplay from "@/components/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import React, { useMemo, useState } from "react";
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
import DisplaySettingsTab from "@/components/Tabs/TabsContent/DisplaySettingsTab.tsx";
import { IconContext } from "react-icons";
import { IoMdPlay, IoMdSave, IoMdSettings } from "react-icons/io";
import { MdDelete, MdStarOutline } from "react-icons/md";
import {
  TbArrowsMove,
  TbPointer,
  TbPointerMinus,
  TbPointerPlus,
} from "react-icons/tb";
import { BsArrowDownUp } from "react-icons/bs";
import { ImArrowUpRight2 } from "react-icons/im";
import { VscDebugDisconnect } from "react-icons/vsc";
import { edgeDto, nodeDto, stateObject } from "@/lib/types.ts";
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

export const GraphBuilder = (props: {
  style: { width: string; height: string };
}) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const activeTool = useSelector(
    (state: RootState) => state.graphBuilderTool.currentTool,
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const [isTabsHidden, setIsTabsHidden] = useState<boolean>(true);

  const backgroundGradient =
    theme.theme === "dark"
      ? "bg-gradient-to-br from-blue-800 via-teal-900 to-zinc-800"
      : "bg-gradient-to-br from-blue-300 via-purple-300 to-gray-200";

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
            onClick={() => console.log("Graph has been saved!")}
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
                // else setCurrentStep(0);
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
