import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnUI/dropdown-menu.tsx";
import { Point, stateObject } from "../../../../types.ts";
import { useMemo, useState } from "react";
import { Input } from "@/components/shadcnUI/input.tsx";
import { Button } from "@/components/shadcnUI/button.tsx";
import { setWeight } from "@/redux/GraphEdges/actionCreator.ts";
import { useDispatch, useSelector } from "react-redux";
import { setNodeName } from "@/redux/GraphNodes/actionCreator.ts";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer.ts";
import { RootState } from "@/redux/store.ts";
export type GraphNodeStates =
  | "primary"
  | "secondary"
  | "selected"
  | "comparing"
  | "visited";
export interface GraphNodeProps {
  name?: string;
  id: string;
  coordinates: Point;
  radius?: number;
  isActive: boolean;
  algorithmState?: GraphNodeStates;
}

export const GraphNode = (props: GraphNodeProps) => {
  const dispatch = useDispatch();
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings,
  );

  const [input, setInput] = useState<string>(`${props.name}`);

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
            className={`flex justify-center items-center shadow-2xl overflow-hidden aspect-square rounded-full w-full text-white text-xl font-bold border-4`}
            style={{
              width: `${displaySettings.nodeSize || 90}px`,
              backgroundColor: displaySettings.nodeColor,
              borderColor: displaySettings.nodeBorderColor,
            }}
          >
            {props.name}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{props.name}</DropdownMenuLabel>
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
