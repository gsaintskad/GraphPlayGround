import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnUI/dropdown-menu.tsx";
import { Point, stateObject } from "../../../../types.ts";
import {useMemo, useState} from "react";
import {Input} from "@/components/shadcnUI/input.tsx";
import {Button} from "@/components/shadcnUI/button.tsx";
import {setWeight} from "@/redux/GraphEdges/actionCreator.ts";
import {useDispatch} from "react-redux";
import {setNodeName} from "@/redux/GraphNodes/actionCreator.ts";
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
  const [input, setInput] = useState<string>(`${props.name}`);
  const algorithmStateColorMap = useMemo(() => {

    const stateColorMap = new Map<GraphNodeStates, string>();
    stateColorMap.set("primary", "bg-green-700");
    stateColorMap.set("secondary", "bg-blue-700");
    stateColorMap.set("comparing", "bg-yellow-700");
    stateColorMap.set("visited", "bg-gray-600");
    stateColorMap.set("selected", "bg-sky-600");

    return stateColorMap;
  }, []);
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
            className={`${algorithmStateColorMap.get(props.algorithmState || "primary")} flex justify-center items-center shadow-2xl aspect-square overflow-hidden rounded-full w-full text-white text-xl font-bold border-4 border-white`}
            style={{ width: `${props.radius || 90}px` }}
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
                  setInput(e.target.value)
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
