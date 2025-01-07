import GraphDisplay from "@/components/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import React, { useMemo, useState } from "react";
import { GraphBuilderActions } from "./graphBuilderActions.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import {
  discardNodeMap,
  discardSelection,
} from "@/redux/GraphNodes/actionCreator.ts";
import { discardEdgeMap } from "@/redux/GraphEdges/actionCreator.ts";
import InstrumentButton from "@/components/GraphBuilder/InstrumentButton.tsx";
import { useTheme } from "@/components/shadcnUI/ThemeProvider.tsx";
import DisplaySettingsTab from "@/components/GraphBuilder/GraphDisplay/DisplaySettingsTab.tsx";
import { IconContext } from "react-icons";
import { IoMdPlay, IoMdSave, IoMdSettings } from "react-icons/io";
import { MdDelete, MdStarOutline } from "react-icons/md";
import { TbPointer, TbPointerMinus, TbPointerPlus } from "react-icons/tb";
import { BsArrowDownUp } from "react-icons/bs";
import { ImArrowUpRight2 } from "react-icons/im";
import { VscDebugDisconnect } from "react-icons/vsc";
import { edgeDto, nodeDto, stateObject } from "@/lib/types.ts";

export const GraphBuilder = (props: {
  style: { width: string; height: string };
}) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const [activeHandler, setActiveHandler] = useState<GraphBuilderActions>("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isSettingsHidden, setisSettingsHidden] = useState<boolean>(true);

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
          size: "5rem",
          color: theme.theme === "dark" ? "#000" : "#FFF",
          style: { fontSize: "3rem" },
        }}
      >
        <div className="flex h-16 gap-x-8 w-full items-center justify-center">
          <InstrumentButton
            name="Save Graph"
            description="Save the current graph"
            onClick={() => console.log("Graph has been saved!")}
          >
            <IoMdSave />
          </InstrumentButton>

          <InstrumentButton
            name="Delete Graph"
            description="Delete the current graph"
            onClick={() => {
              dispatch(discardSelection());
              dispatch(discardNodeMap());
              dispatch(discardEdgeMap());
            }}
          >
            <MdDelete />
          </InstrumentButton>
          <InstrumentButton
            name="Settings"
            description="Open graph settings"
            onClick={() => setisSettingsHidden(!isSettingsHidden)}
          >
            <IoMdSettings />
          </InstrumentButton>
        </div>

        <div className="grid grid-cols-[100px_1fr_auto] h-full">
          <div className="flex flex-col gap-y-4 items-center overflow-y-auto scrollbar-thin">
            <InstrumentButton
              name="Pointer"
              onClick={() => setActiveHandler("pointer")}
            >
              <TbPointer />
            </InstrumentButton>
            <InstrumentButton
              name="Move"
              onClick={() => setActiveHandler("move")}
            >
              <TbPointerMinus />
            </InstrumentButton>
            <InstrumentButton
              name="Create Node"
              onClick={() => setActiveHandler("create")}
            >
              <TbPointerPlus />
            </InstrumentButton>
            <InstrumentButton
              name="Delete Node"
              onClick={() => setActiveHandler("remove")}
            >
              <MdDelete />
            </InstrumentButton>
            <InstrumentButton
              name="Connect Nodes"
              onClick={() => setActiveHandler("connect")}
            >
              <BsArrowDownUp />
            </InstrumentButton>
            <InstrumentButton
              name="Direct Connect"
              onClick={() => setActiveHandler("directConnect")}
            >
              <ImArrowUpRight2 />
            </InstrumentButton>
            <InstrumentButton
              name="Disconnect Nodes"
              onClick={() => setActiveHandler("disconnect")}
            >
              <VscDebugDisconnect />
            </InstrumentButton>
          </div>

          <GraphDisplay
            className={`rounded-xl  ${
              theme.theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
            activeHandler={activeHandler}
          />

          <DisplaySettingsTab isSettingsHidden={isSettingsHidden} />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default GraphBuilder;
