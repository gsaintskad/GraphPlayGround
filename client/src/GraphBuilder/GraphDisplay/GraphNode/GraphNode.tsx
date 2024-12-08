import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Point} from "../../../../types.ts";

export interface GraphNodeProps {
  name?: string;
  id: string;
  coordinates:Point;
  radius?: number;
  isActive: boolean;
}
export const GraphNode = (props: GraphNodeProps) => {
  return (
    <div
      className={`absolute z-40`}
      style={{ left: `${props.coordinates.x}px`, top: `${props.coordinates.y}px` }}
      // onClick={()=>console.log(props.id)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger disabled={!props.isActive}>
          <div  className={`bg-green-700 flex justify-center items-center shadow-2xl aspect-square overflow-hidden rounded-full w-full text-white text-xl font-bold border-4 border-white`}
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
