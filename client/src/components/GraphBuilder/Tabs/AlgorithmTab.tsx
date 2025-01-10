import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer.ts";

import { i18n } from "@/lib/i18n.ts";
import { Button } from "@/components/shadcnUI/button.tsx";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBackSharp,
  IoPlaySkipForward,
} from "react-icons/io5";
import { AnimationState } from "@/redux/Animations/reducer.ts";
import {
  AlgorithmStep,
  AlgorithmType,
} from "@/redux/Animations/actionTypes.ts";
import { edgeDto, nodeDto, stateObject } from "@/lib/types.ts";
import { setDijkstra } from "@/redux/Animations/actionCreator.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcnUI/table.tsx";
import {
  discardAlgorithmState,
  resetNodeMapState,
  setAlgorithmState,
} from "@/redux/GraphNodes/actionCreator.ts";
import { GraphNodeActionTypes } from "@/redux/GraphNodes/actionTypes.ts";
import { GraphNodeAlgorithmStates } from "@/redux/GraphNodes/actionTypes.ts";
import { setAnimationSpeed } from "@/redux/DisplaySettings/actionCreator.ts";
import { GraphBuilderTool } from "@/redux/GraphBuilder/actionTypes.ts";
import { setPlayAnimationTool } from "@/redux/GraphBuilder/actionCreator.ts";
import { Label } from "@/components/shadcnUI/label.tsx";

interface AlgorithmTabProps {
  className?: string;
}

const AlgorithmTab = (props: AlgorithmTabProps) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const activeTool = useSelector(
    (state: RootState) => state.graphBuilderTool.currentTool,
  );

  const dispatch = useDispatch();
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
  const [timerIDs, setTimerIDs] = useState<NodeJS.Timeout[]>([]);
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const animations: AnimationState = useSelector(
    (state: RootState) => state.animations,
  );
  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language],
  );
  const highlightHandler = useCallback(
    (id: string) => {
      const prevState = nodeMap[id].algorithmState!;
      dispatch(setAlgorithmState(id, "highlighted"));
      console.log(
        `timeout for node${id} has been run\nprev state:${prevState}`,
      );
      setTimeout(() => {
        dispatch(
          setAlgorithmState(
            id,
            prevState === "highlighted" ? "primary" : prevState,
          ),
        );
        console.log(`timeout for node${id} has been finished`);
      }, displaySettings.animationSpeed);
    },
    [displaySettings.animationSpeed, nodeMap],
  );
  const [currentAlgorithm, setCurrentAlgorithm] =
    useState<AlgorithmType>("Dijkstra");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const renderStep = useCallback(
    (stepNumber: number) => {
      console.log(`currentStep: ${currentStep}`);
      if (stepNumber >= currentStep) {
        let i = currentStep;
        while (i <= stepNumber) {
          if (currentStep < animations[currentAlgorithm].steps.length) {
            const { id, algorithmState } =
              animations[currentAlgorithm].steps[i].payload;
            dispatch(setAlgorithmState(id, algorithmState));
            i++;
          }
        }
        console.log(`stepNumber >= currentStep: ${i}`);
        setCurrentStep(i);
      } else if (stepNumber < currentStep) {
        dispatch(resetNodeMapState());
        let i = 0;
        console.log(`stepNumber < currentStep: ${i}`);
        while (i <= stepNumber) {
          if (currentStep < animations[currentAlgorithm].steps.length) {
            const { id, algorithmState } =
              animations[currentAlgorithm].steps[i].payload;
            dispatch(setAlgorithmState(id, algorithmState));
            i++;
          }
        }

        setCurrentStep(i);
      }
    },
    [animations],
  );

  return (
    <div className={" flex flex-col"}>
      <div className="flex gap-x-5 py-3">
        <Button
          disabled={activeTool !== GraphBuilderTool.PLAY_ANIMATION}
          className="w-full"
          onClick={() => renderStep(currentStep - 2)}
        >
          <IoPlaySkipBackSharp />
        </Button>
        <Button
          disabled={activeTool !== GraphBuilderTool.PLAY_ANIMATION}
          className="w-full"
          onClick={() => {
            setIsAnimationPlaying(!isAnimationPlaying);
            const LocalTimerIDs = structuredClone(timerIDs);
            if (!isAnimationPlaying)
              for (
                let i = currentStep;
                i < animations[currentAlgorithm].steps.length;
                i++
              ) {
                LocalTimerIDs.push(
                  setTimeout(
                    () => renderStep(i),
                    (i - currentStep) * displaySettings.animationSpeed,
                  ),
                );
              }
            else LocalTimerIDs.forEach((timeout) => clearTimeout(timeout));
            setTimerIDs(LocalTimerIDs);
            setIsAnimationPlaying(!isAnimationPlaying);
          }}
        >
          {isAnimationPlaying ? <IoPause /> : <IoPlay />}
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            if (currentStep < animations[currentAlgorithm].steps.length)
              renderStep(currentStep);
          }}
          disabled={activeTool !== GraphBuilderTool.PLAY_ANIMATION}
        >
          <IoPlaySkipForward />
        </Button>
      </div>
      <div className="mx-auto">
        <Button
          disabled={activeTool !== GraphBuilderTool.PLAY_ANIMATION}
          onClick={() => {
            // Prepare Graph to be sent
            const nodeDtoMap: stateObject<nodeDto> = {};
            const edgeDtoMap: stateObject<edgeDto> = {};
            let lastId: string = "";
            for (const id in nodeMap) {
              nodeDtoMap[id] = {
                displayValue: nodeMap[id].displayValue,
                id,
              } as nodeDto;
              lastId = id;
            }
            for (const id in edgeMap) {
              const { nodeAid, nodeBid, weight, isDirected } = edgeMap[id];

              edgeDtoMap[id] = {
                nodeAid,
                nodeBid,
                weight,
                id,
                isDirected: !!isDirected,
              };
            }

            // Log the data
            console.log(edgeDtoMap, nodeDtoMap);

            // Send the data via a POST request
            fetch("http://localhost:3000/graph", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nodes: nodeDtoMap,
                edges: edgeDtoMap,
                startNodeId: lastId,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                // dispatch(setAnimation)

                dispatch(setDijkstra(data.dijkstra));
                setCurrentStep(0);
                console.log(animations);
              })
              .catch((error) => {
                console.error("Error saving graph:", error);
              });
          }}
        >
          save
        </Button>
        <Button
          onClick={() => {
            dispatch(resetNodeMapState());
            setIsAnimationPlaying(false);
            setCurrentStep(0);
            renderStep(0);
          }}
        >
          Reset
        </Button>
      </div>
      <Table>
        <TableCaption>Algorithm steps</TableCaption>
        <TableHeader className="sticky">
          <TableRow>
            <TableHead className="w-[30px]">Step</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Payload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animations[currentAlgorithm!].steps.map((step, i) => (
            <TableRow
              onClick={() => renderStep(i)}
              key={
                step.payload.id.toString() +
                "---" +
                step.type.toString() +
                i.toString()
              }
              className={currentStep - 1 === i ? "bg-yellow-600/50" : ""}
            >
              <TableCell className="font-medium">{i}</TableCell>
              <TableCell>Set node as {step.payload.algorithmState}</TableCell>
              <TableCell
                className={"hover:bg-yellow-600/50"}
                onClick={(e) => {
                  e.stopPropagation();
                  highlightHandler(step.payload.id);
                }}
              >
                {step.payload.id}
              </TableCell>
              <TableCell className="text-right">
                {JSON.stringify(step.payload.queueState)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              Output : {JSON.stringify(animations[currentAlgorithm].output)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AlgorithmTab;
