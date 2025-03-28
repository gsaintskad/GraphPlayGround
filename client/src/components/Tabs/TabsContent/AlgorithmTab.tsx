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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnUI/select.tsx";
import { Slider } from "@/components/shadcnUI/slider.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcnUI/accordion.tsx";
import AlgorithmInputSelect from "@/components/Tabs/TabsContent/AlgorithmInputSelect.tsx";
import {
  chooseCurrentAlgorithm,
  setDijkstra,
} from "@/redux/Animations/actionCreator.ts";

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
  const { currentAlgorithm, ...algorithms }: AnimationState = useSelector(
    (state: RootState) => state.animations,
  );
  const [localAnimationSpeed, setLocalAnimationSpeed] = useState<number>(
    displaySettings.animationSpeed,
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

  const [currentStep, setCurrentStep] = useState<number>(0);

  const renderStep = useCallback(
    /*the currentStep duplicating is necessary to optimize redux work.
    because in some cases the function is calling in places where the index
    has no time to update itself
     */
    (stepNumber: number, currStep: number = currentStep) => {
      if (currStep < algorithms[currentAlgorithm!].steps.length) {
        console.log(`currentStep: ${currStep}`);
        let i = 0;
        if (stepNumber >= currStep) {
          for (i = currStep; i <= stepNumber; i++) {
            const { id, algorithmState } =
              algorithms[currentAlgorithm!].steps[i].payload;
            dispatch(setAlgorithmState(id, algorithmState));
          }
          console.log(`stepNumber >= currentStep: ${i}`);
        } else if (stepNumber < currStep) {
          dispatch(resetNodeMapState());
          let i = 0;
          console.log(`stepNumber < currentStep: ${i}`);
          for (i = 0; i <= stepNumber; i++) {
            const { id, algorithmState } =
              algorithms[currentAlgorithm!].steps[i].payload;
            dispatch(setAlgorithmState(id, algorithmState));
          }
        }
        setCurrentStep(i);
      }
    },
    [algorithms, currentStep],
  );
  const handleAnimationSettingSubmit = () => {
    dispatch(setAnimationSpeed(localAnimationSpeed));
  };
  return (
    <div className={" flex flex-col"}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Animation Settings</AccordionTrigger>
          <AccordionContent>
            <div className={"flex flex-col items-center"}>
              <div className="flex  items-center gap-x-5 h-10 mb-5">
                <Label>Animation speed : {localAnimationSpeed} ms</Label>
                <button
                  onClick={handleAnimationSettingSubmit}
                  className="mt-1 p-1 bg-blue-500 text-white rounded"
                >
                  Save Animation Settings
                </button>
              </div>
              <Slider
                className={"bg-white rounded-full"}
                onValueChange={(v) => setLocalAnimationSpeed(v[0])}
                defaultValue={[localAnimationSpeed]}
                max={5000}
                min={100}
                step={100}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex  items-center gap-x-5 h-10 mb-5 hidden">
        <Label>Current step : {currentStep}</Label>
        <Slider
          value={[currentStep]}
          className={"bg-white rounded-full"}
          onValueChange={([v, ...rest]) => renderStep(v)}
          defaultValue={[0]}
          max={
            currentAlgorithm ? algorithms[currentAlgorithm].steps.length : 10
          }
          min={0}
          step={1}
        />
      </div>
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
                i < algorithms[currentAlgorithm!].steps.length;
                i++
              ) {
                LocalTimerIDs.push(
                  setTimeout(
                    () => renderStep(i, i),
                    (i - currentStep) * displaySettings.animationSpeed,
                  ),
                );
              }
            else LocalTimerIDs.forEach((timeout) => clearTimeout(timeout));
            setTimerIDs(LocalTimerIDs);
          }}
        >
          {isAnimationPlaying ? <IoPause /> : <IoPlay />}
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            if (currentStep < algorithms[currentAlgorithm!].steps.length)
              renderStep(currentStep);
          }}
          disabled={activeTool !== GraphBuilderTool.PLAY_ANIMATION}
        >
          <IoPlaySkipForward />
        </Button>
      </div>
      <div className="mx-auto flex my-3">
        <Label className={"mr-3"}>Current Algorithm:</Label>
        <div className="flex flex-col gap-y-3">
          <Select
            onValueChange={(alg) =>
              dispatch(chooseCurrentAlgorithm(alg as AlgorithmType))
            }
          >
            <SelectTrigger>
              <SelectValue
                className={"inline "}
                placeholder="Choose an algorithm"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"Dijkstra" as AlgorithmType}>
                Dijkstra
              </SelectItem>
              <SelectItem value={"Astar" as AlgorithmType}>Astar</SelectItem>
              <SelectItem value={"DFS" as AlgorithmType}>DFS</SelectItem>
              <SelectItem value={"BFS" as AlgorithmType}>BFS</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-y-3">
            <AlgorithmInputSelect />
          </div>
        </div>
        <Button
          className="ml-3"
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
                console.log(algorithms);
              })
              .catch((error) => {
                console.error("Error saving graph:", error);
              });
          }}
        >
          Compute
        </Button>
        <Button
          className="ml-3"
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
        {currentAlgorithm && (
          <>
            <TableBody>
              {algorithms[currentAlgorithm!].steps.map((step, i) => (
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
                  <TableCell>
                    Set node as {step.payload.algorithmState}
                  </TableCell>
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
                  Output :
                  {
                    JSON.stringify(algorithms[currentAlgorithm!]!.output!)
                    // Object!
                    // .entries(
                    //   animations[currentAlgorithm!]!.output! as stateObject<number>,
                    // )
                    // .map(([id, weight]) => (
                    //   <Label>
                    //     {nodeMap[id].displayValue} : {weight};
                    //   </Label>
                    // ))
                  }
                </TableCell>
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
    </div>
  );
};

export default AlgorithmTab;
