import GraphDisplay from "@/components/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import React, { useMemo, useState } from "react";
import { GraphBuilderActions } from "./graphBuilderActions.ts";
import { GraphNodeProps } from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { GraphEdgeProps } from "@/components/GraphBuilder/GraphDisplay/GraphEdge.tsx";
import { BsArrowDownUp } from "react-icons/bs";
import { TbPointer, TbPointerMinus, TbPointerPlus } from "react-icons/tb";
import { ImArrowUpRight2 } from "react-icons/im";
import { IoIosMove, IoMdSave, IoMdSettings } from "react-icons/io";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import {
  discardNodeMap,
  discardSelection,
} from "@/redux/GraphNodes/actionCreator.ts";
import { discardEdgeMap } from "@/redux/GraphEdges/actionCreator.ts";
import InstrumentButton from "@/components/GraphBuilder/InstrumentButton.tsx";

import { useTheme } from "@/components/shadcnUI/ThemeProvider.tsx";
import DisplaySettingsTab from "@/components/GraphBuilder/GraphDisplay/DisplaySettingsTab.tsx";
import { i18n } from "@/lib/i18n.ts";
import displaySettingsTab from "@/components/GraphBuilder/GraphDisplay/DisplaySettingsTab.tsx";

export const GraphBuilder = (props: {
  style: { width: string; height: string };
}) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );

  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language],
  );
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
    const matrix: (GraphEdgeProps | null)[][] = Array(vertexes.length)
      .fill(null)
      .map(() => Array(vertexes.length).fill(null));

    for (const id in edgeMap) {
      const edge = edgeMap[id];
      const fromIndex = vertexes.findIndex((node) => node.id === edge.nodeAid);
      const toIndex = vertexes.findIndex((node) => node.id === edge.nodeBid);

      if (fromIndex !== -1 && toIndex !== -1) {
        matrix[fromIndex][toIndex] = edge;

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

  const theme = useTheme();
  const [isSettingsHidden, setIsSettingsHidden] = useState<boolean>(true);

  return (
    <div
      className={`flex flex-col h-full w-full ${theme.theme === "dark" ? "bg-zinc-900" : "bg-zinc-500"}`}
      style={props.style}
    >
      <IconContext.Provider
        value={{
          size: "3rem",
          color: theme.theme === "dark" ? "#000" : "#FFF",
          className: "global-class-name",
          style: { fontSize: "3rem", width: "30px", height: "30px" },
        }}
      >
        <div className={`h-12  flex justify-center items-center gap-8 w-full`}>
          <InstrumentButton
            name={language.instrumentButtons.saveGraph.name}
            description={language.instrumentButtons.saveGraph.description}
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
          <InstrumentButton
            name={language.instrumentButtons.deleteGraph.name}
            description={language.instrumentButtons.deleteGraph.description}
            onClick={() => {
              dispatch(discardSelection());
              dispatch(discardNodeMap());
              dispatch(discardEdgeMap());
            }}
          >
            <MdDelete />
          </InstrumentButton>

          <InstrumentButton
            name={language.instrumentButtons.settings.name}
            description={language.instrumentButtons.settings.description}
            onClick={() => {
              setIsSettingsHidden(() => !isSettingsHidden);
            }}
          >
            <IoMdSettings />
          </InstrumentButton>
        </div>

        <div className={`h-full flex`}>
          <div
            className={`pt-10 flex flex-col h-full px-2 gap-8 w-16 justify-center items-center overflow-y-auto`}
          >
            <InstrumentButton
              name={language.instrumentButtons.pointer.name}
              description={language.instrumentButtons.pointer.description}
              onClick={() => toggleHandler("pointer")}
            >
              <TbPointer />
            </InstrumentButton>
            <InstrumentButton
              name={language.instrumentButtons.move.name}
              description={language.instrumentButtons.move.description}
              onClick={() => toggleHandler("move")}
            >
              <IoIosMove />
            </InstrumentButton>
            <InstrumentButton
              name={language.instrumentButtons.create.name}
              description={language.instrumentButtons.create.description}
              onClick={() => toggleHandler("create")}
            >
              <TbPointerPlus />
            </InstrumentButton>
            <InstrumentButton
              name={language.instrumentButtons.remove.name}
              description={language.instrumentButtons.remove.description}
              onClick={() => toggleHandler("remove")}
            >
              <TbPointerMinus />
            </InstrumentButton>
            <InstrumentButton
              name={language.instrumentButtons.connection.name}
              description={language.instrumentButtons.connection.description}
              onClick={() => toggleHandler("connect")}
            >
              <BsArrowDownUp />
            </InstrumentButton>
            <InstrumentButton
              name={language.instrumentButtons.directConnection.name}
              description={
                language.instrumentButtons.directConnection.description
              }
              onClick={() => toggleHandler("directConnect")}
            >
              <ImArrowUpRight2 />
            </InstrumentButton>
            <InstrumentButton
              name={language.instrumentButtons.disconnect.name}
              description={language.instrumentButtons.disconnect.description}
              onClick={() => toggleHandler("disconnect")}
            >
              <VscDebugDisconnect />
            </InstrumentButton>
          </div>
          <GraphDisplay
            className={`rounded-tl-md ${theme.theme === "dark" ? "bg-zinc-800" : "bg-zinc-400"}`}
            activeHandler={activeHandler}
          />
          <DisplaySettingsTab
            className=""
            isSettingsHidden={isSettingsHidden}
          />
        </div>
      </IconContext.Provider>
    </div>
  );
};
