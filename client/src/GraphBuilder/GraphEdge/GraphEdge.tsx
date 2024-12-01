import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

import { GraphNodeProps } from "@/GraphBuilder/GraphNode/GraphNode.tsx";
import { useEffect, useMemo, useState } from "react";
import { Point } from "../../../types.ts";

export interface GraphEdgeProps {
  id: string;
  nodeA: GraphNodeProps;
  nodeB: GraphNodeProps;
  radius: number;
  width?: number;
}

export const GraphEdge = (props: GraphEdgeProps) => {
  const start: Point = useMemo<Point>(() => {
    return {
      x: props.nodeA.x + props.radius || 90,
      y: props.nodeA.y + props.radius || 90,
    } satisfies Point;
  }, [props]);
  const end: Point = useMemo<Point>(() => {
    return {
      x: props.nodeB.x + props.radius || 90,
      y: props.nodeB.y + props.radius || 90,
    } satisfies Point;
  }, [props]);
  const angle = useMemo<number>(() => {
    return 0;
  }, [props]);
  const lenght = useMemo<number>(() => {
    return Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2),
    );
  }, [props]);
  return (
    <div
      className={`absolute z-40`}
      style={{ left: `${start.x}px`, top: `${start.y}px`,width:`${lenght}px`,height:`${props.width}px`,transform:`rotate(${angle}deg)` }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={`bg-gray-200 flex justify-center items-center shadow-2xl h-full w-full`}
          >
            {props.id}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>1</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>id: {props.id}</DropdownMenuItem>
          <DropdownMenuItem>1</DropdownMenuItem>
          <DropdownMenuItem>y</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
