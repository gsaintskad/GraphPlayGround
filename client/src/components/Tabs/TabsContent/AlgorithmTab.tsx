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
  resetNodeMapState,
  setAlgorithmState,
} from "@/redux/GraphNodes/actionCreator.ts";
import { GraphBuilderTool } from "@/redux/GraphBuilder/actionTypes.ts";
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
  setAstar,
  setBFS,
  setDFS,
  setDijkstra,
} from "@/redux/Animations/actionCreator.ts";
import { setAnimationSpeed } from "@/redux/DisplaySettings/actionCreator.ts";

const AlgorithmTab = () => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);
  const activeTool = useSelector(
    (state: RootState) => state.graphBuilderTool.currentTool
  );
  const dispatch = useDispatch();
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
  const [timerIDs, setTimerIDs] = useState<NodeJS.Timeout[]>([]);
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings
  );
  const { currentAlgorithm, ...algorithms }: AnimationState = useSelector(
    (state: RootState) => state.animations
  );
  const [localAnimationSpeed, setLocalAnimationSpeed] = useState<number>(
    displaySettings.animationSpeed
  );
  const [savedGraphId, setSavedGraphId] = useState<string | null>(null);
  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language]
  );
  const highlightHandler = useCallback(
    (id: string) => {
      const prevState = nodeMap[id].algorithmState!;
      dispatch(setAlgorithmState(id, "highlighted"));
      setTimeout(() => {
        dispatch(
          setAlgorithmState(
            id,
            prevState === "highlighted" ? "primary" : prevState
          )
        );
      }, displaySettings.animationSpeed);
    },
    [displaySettings.animationSpeed, nodeMap]
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

  const renderStep = useCallback(
    (stepNumber: number, currStep: number = currentStep) => {
      if (currStep < algorithms[currentAlgorithm!].steps.length) {
        let i = 0;
        if (stepNumber >= currStep) {
          for (i = currStep; i <= stepNumber; i++) {
            const { id, algorithmState } =
              algorithms[currentAlgorithm!].steps[i].payload;
            dispatch(setAlgorithmState(id, algorithmState));
          }
        } else {
          dispatch(resetNodeMapState());
          for (i = 0; i <= stepNumber; i++) {
            const { id, algorithmState } =
              algorithms[currentAlgorithm!].steps[i].payload;
            dispatch(setAlgorithmState(id, algorithmState));
          }
        }
        setCurrentStep(i);
      }
    },
    [algorithms, currentStep]
  );

  const handleSaveGraph = () => {
    const nodeDtoMap: stateObject<nodeDto> = {};
    for (const id in nodeMap) {
      nodeDtoMap[id] = {
        id,
        displayValue: nodeMap[id].displayValue,
        x: nodeMap[id].coordinates.x,
        y: nodeMap[id].coordinates.y,
      };
    }

    const edgeDtoMap: stateObject<edgeDto> = {};
    for (const id in edgeMap) {
      const { nodeAid, nodeBid, weight, isDirected } = edgeMap[id];
      edgeDtoMap[id] = {
        id,
        nodeAid,
        nodeBid,
        weight,
        isDirected: !!isDirected,
      };
    }

    const url = savedGraphId
      ? `http://localhost:3000/graph/${savedGraphId}`
      : "http://localhost:3000/graph";
    const method = savedGraphId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: nodeDtoMap, edges: edgeDtoMap }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setSavedGraphId(data.id);
        }
      })
      .catch(console.error);
  };

  const handleCompute = () => {
    if (!savedGraphId || !currentAlgorithm) return;

    const { startNodeId, targetNodeId } = algorithms[currentAlgorithm].arguments;

    fetch(`http://localhost:3000/graph/${savedGraphId}/compute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        algorithm: currentAlgorithm,
        startNodeId: startNodeId,
        targetNodeId: targetNodeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(resetNodeMapState());
        const result = data[currentAlgorithm.toLowerCase()];
        switch (currentAlgorithm) {
          case "Dijkstra":
            dispatch(setDijkstra(result));
            break;
          case "BFS":
            dispatch(setBFS(result));
            break;
          case "DFS":
            dispatch(setDFS(result));
            break;
          case "Astar":
            dispatch(setAstar(result));
            break;
        }
        setCurrentStep(0);
      })
      .catch(console.error);
  };

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
                    (i - currentStep) * displaySettings.animationSpeed
                  )
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
        <Button className="ml-3" onClick={handleSaveGraph}>
          {savedGraphId ? "Update Graph" : "Save Graph"}
        </Button>
        <Button
          className="ml-3"
          onClick={handleCompute}
          disabled={!savedGraphId}
        >
          Compute
        </Button>
        <Button
          className="ml-3"
          onClick={() => {
            dispatch(resetNodeMapState());
            setIsAnimationPlaying(false);
            setCurrentStep(0);
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
        {currentAlgorithm && algorithms[currentAlgorithm] && (
          <>
            <TableBody>
              {algorithms[currentAlgorithm].steps.map((step, i) => (
                <TableRow
                  onClick={() => renderStep(i)}
                  key={`${step.payload.id}-${step.type}-${i}`}
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
                  {JSON.stringify(algorithms[currentAlgorithm]!.output!)}
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