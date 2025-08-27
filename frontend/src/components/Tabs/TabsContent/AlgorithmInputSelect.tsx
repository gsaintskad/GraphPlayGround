import React, { ReactNode, useCallback } from "react";
import { Label } from "@/components/shadcnUI/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnUI/select.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { AnimationState } from "@/redux/Animations/reducer.ts";
import {
  chooseCurrentAlgorithm,
  setAlgorithmArguments,
  setDijkstra,
} from "@/redux/Animations/actionCreator.ts";
import {
  AlgorithmType,
  DijkstraInput,
} from "@/redux/Animations/actionTypes.ts";

const AlgorithmInputSelect = () => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const { currentAlgorithm, ...algorithms }: AnimationState = useSelector(
    (state: RootState) => state.animations,
  );
  const dispatch = useDispatch();

  const processNodePick = useCallback(
    (argument: string, nodeId: string) => {
      dispatch(setAlgorithmArguments(currentAlgorithm!, argument, nodeId));
    },
    [currentAlgorithm, nodeMap],
  );
  const renderNodeSelect = useCallback(
    (argumentName: string) => {
      const selectItems: ReactNode[] = [];
      for (const nodeId in nodeMap) {
        selectItems.push(
          <SelectItem
            key={currentAlgorithm + " " + argumentName + `selectItem` + nodeId}
            value={nodeId}
          >
            {nodeMap[nodeId].displayValue}
          </SelectItem>,
        );
      }
      return selectItems;
    },
    [nodeMap],
  );
  const renderArguments = useCallback((): ReactNode[] => {
    const args: ReactNode[] = [];
    if (currentAlgorithm)
      for (const argument in algorithms[currentAlgorithm].arguments) {
        args.push(
          <div key={currentAlgorithm + " " + argument + "select"}>
            <Label className={"mr-3"}>{argument}</Label>
            <Select onValueChange={(v) => processNodePick(argument, v)}>
              <SelectTrigger>
                <SelectValue className={"inline"} placeholder="Pick a node" />
              </SelectTrigger>
              <SelectContent>{renderNodeSelect(argument)}</SelectContent>
            </Select>
          </div>,
        );
      }
    return args;
  }, [currentAlgorithm, nodeMap]);
  return <>{renderArguments()}</>;
};

export default AlgorithmInputSelect;
