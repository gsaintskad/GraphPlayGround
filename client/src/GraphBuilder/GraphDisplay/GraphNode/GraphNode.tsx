import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Point, stateObject} from "../../../../types.ts";
import {useMemo} from "react";
export type GraphNodeStates='primary'|"secondary"|"selected"|"comparing"|"visited";
export interface GraphNodeProps {
  name?: string;
  id: string;
  coordinates:Point;
  radius?: number;
  isActive: boolean;
  algoritmState?:GraphNodeStates;
}

export const GraphNode = (props: GraphNodeProps) => {
  const algoritmStateColorMap = useMemo(() => {
    const stateColorMap=new Map<GraphNodeStates,string>();
    stateColorMap.set('primary','bg-green-700')
    stateColorMap.set('secondary','bg-blue-700')
    stateColorMap.set('comparing','bg-yellow-700')
    stateColorMap.set('visited','bg-gray-700')

    return stateColorMap;
  }, []);
  return (
    <div
      className={`absolute z-40`}
      style={{ left: `${props.coordinates.x}px`, top: `${props.coordinates.y}px` }}
      // onClick={()=>console.log(props.id)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger disabled={!props.isActive}>
          <div  className={`${algoritmStateColorMap.get(props.algoritmState||'primary')} flex justify-center items-center shadow-2xl aspect-square overflow-hidden rounded-full w-full text-white text-xl font-bold border-4 border-white`}
          style={{width: `${props.radius||90}px`}}>
              {props.name}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{props.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>id: {props.id}</DropdownMenuItem>
          <DropdownMenuItem>x: {props.coordinates.x}</DropdownMenuItem>
          <DropdownMenuItem>y: {props.coordinates.y}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
