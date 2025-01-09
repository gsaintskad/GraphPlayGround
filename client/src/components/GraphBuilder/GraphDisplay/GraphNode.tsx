import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnUI/dropdown-menu.tsx";
import { Point, stateObject } from "../../../lib/types.ts";
import { useMemo, useState } from "react";
import { Input } from "@/components/shadcnUI/input.tsx";
import { Button } from "@/components/shadcnUI/button.tsx";
import { setWeight } from "@/redux/GraphEdges/actionCreator.ts";
import { useDispatch, useSelector } from "react-redux";
import { setNodeName } from "@/redux/GraphNodes/actionCreator.ts";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer.ts";
import { RootState } from "@/redux/store.ts";
import {GraphNodeAlgorithmStates} from "@/redux/GraphNodes/actionTypes.ts";

export interface GraphNodeProps {
  displayValue: string;

  id: string;
  coordinates: Point;
  radius?: number;
  isActive: boolean;
  algorithmState?: GraphNodeAlgorithmStates;
}

export const GraphNode = (props: GraphNodeProps) => {
  const dispatch = useDispatch();
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings,
  );

  const [input, setInput] = useState<string>(`${props.displayValue}`);

  return (
    <div
      className={`absolute z-40`}
      style={{
        left: `${props.coordinates.x}px`,
        top: `${props.coordinates.y}px`,
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger disabled={!props.isActive}>
          <div
            className={`flex justify-center font-bold items-center shadow-2xl overflow-hidden aspect-square rounded-full w-full border-4`}
            style={{
              width: `${displaySettings.nodeSize || 90}px`,
              backgroundColor:
                displaySettings.nodeColors[props.algorithmState || "primary"],
              borderColor: displaySettings.nodeBorderColor,
              color: displaySettings.nodeFontColor,
              fontSize: displaySettings.nodeFontSize,
            }}
          >
            {props.displayValue}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{props.displayValue}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>id: {props.id}</DropdownMenuItem>
          <DropdownMenuItem>x: {props.coordinates.x}</DropdownMenuItem>
          <DropdownMenuItem>y: {props.coordinates.y}</DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="string"
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setInput(e.target.value);
                }}
                placeholder="value"
                value={input}
              />
              <Button
                type="submit"
                onClick={(e) => {
                  dispatch(setNodeName(props.id, input));
                }}
              >
                Set
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
