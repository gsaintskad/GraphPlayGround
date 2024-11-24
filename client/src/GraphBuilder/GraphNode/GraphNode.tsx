import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface GraphNodeProps {
  name?: string;
  id: string;
  x: number;
  y: number;
  radius?: number;
}
export const GraphNode = (props: GraphNodeProps) => {
  return (
    <div
      className={`absolute`}
      style={{ left: `${props.x}px`, top: `${props.y}px` }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className={`bg-green-700 flex justify-center items-center shadow-2xl aspect-square rounded-full w-full text-white text-xl font-bold border-4 border-white`}
          style={{width: `${props.radius||80}px`}}>
              {props.id}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{props.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>id: {props.id}</DropdownMenuItem>
          <DropdownMenuItem>x: {props.x}</DropdownMenuItem>
          <DropdownMenuItem>y: {props.y}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
