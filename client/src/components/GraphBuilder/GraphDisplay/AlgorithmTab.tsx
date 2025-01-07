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
  markNodeAsVisited,
  resetNodeMapState,
  setNodeAsComparing,
  setNodeAsPrimary,
  setNodeAsSecondary,
} from "@/redux/GraphNodes/actionCreator.ts";
import { GraphNodeActionTypes } from "@/redux/GraphNodes/actionTypes.ts";

interface AlgorithmTabProps {
  className?: string;
}

const AlgorithmTab = (props: AlgorithmTabProps) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);

  const dispatch = useDispatch();
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
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

  const [currentAlgorithm, setCurrentAlgorithm] =
    useState<AlgorithmType>("Dijkstra");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleStep = useCallback((step: AlgorithmStep) => {
    console.log('handling step : ' ,step)
    switch (step.type as GraphNodeActionTypes) {
      case GraphNodeActionTypes.SET_NODE_AS_PRIMARY: {
        dispatch(setNodeAsPrimary(step.payload.id));
        break;
      }
      case GraphNodeActionTypes.SET_NODE_AS_SECONDARY: {
        dispatch(setNodeAsSecondary(step.payload.id));
        break;
      }
      case GraphNodeActionTypes.SET_NODE_AS_COMPARING: {
        dispatch(setNodeAsComparing(step.payload.id));
        break;
      }
      case GraphNodeActionTypes.MARK_NODE_AS_VISITED: {
        dispatch(markNodeAsVisited(step.payload.id));
        break;
      }

      default: {
        break;
      }
    }
  }, []);
  const renderNextStep = useCallback(
    (stepNumber: number) => {
      if (stepNumber === -1) {
        dispatch(resetNodeMapState());
      }
      else if (stepNumber > currentStep) {
        let i = currentStep;
        do {
          handleStep(animations[currentAlgorithm].steps[i]);
          i++;
        } while (i <= stepNumber);
        setCurrentStep(i);
      }
      else if( stepNumber < currentStep) {
        dispatch(resetNodeMapState());
        let i =0;
        do {
          handleStep(animations[currentAlgorithm].steps[i]);
          i++;
        } while (i <= stepNumber);
        setCurrentStep(i);
      }
    },
    [animations],
  );
  useEffect(() => {}, [animations, isAnimationPlaying]);
  return (
    <div className={" flex flex-col"}>
      <div className="flex">
        <Button className="w-full" onClick={()=>renderNextStep(currentStep-1)}>
          <IoPlaySkipBackSharp />
        </Button>
        <Button
          className="w-full"
          onClick={() => setIsAnimationPlaying(!isAnimationPlaying)}
        >
          {isAnimationPlaying ? <IoPause /> : <IoPlay />}
        </Button>
        <Button className="w-full" onClick={()=>renderNextStep(currentStep+1)}>
          <IoPlaySkipForward />
        </Button>
      </div>
      <Button
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
              console.log(animations);
            })
            .catch((error) => {
              console.error("Error saving graph:", error);
            });
        }}
      >
        ss
      </Button>
      <Table>
        <TableCaption>sss</TableCaption>
        <TableHeader>
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
              key={
                step.payload.id.toString() +
                "---" +
                step.type.toString() +
                i.toString()
              }
            >
              <TableCell className="font-medium">{i}</TableCell>
              <TableCell>{step.type}</TableCell>
              <TableCell>{step.payload.id}</TableCell>
              <TableCell className="text-right">
                {JSON.stringify(step.payload.queueState)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {JSON.stringify(animations[currentAlgorithm].output)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AlgorithmTab;
