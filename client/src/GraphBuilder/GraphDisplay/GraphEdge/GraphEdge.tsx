import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { useEffect, useMemo, useState } from "react";
import { Point } from "../../../../types.ts";

export interface GraphEdgeProps {
  id: string;
  nodeA: GraphNodeProps;
  nodeB: GraphNodeProps;
  isActive: boolean;
  nodeSize?: number;
  width: number;
  isDirected?: boolean;
  
}
const toDeg=(angle:number):number=>{
  return angle*180/Math.PI;
}

export const GraphEdge = (props: GraphEdgeProps) => {

  const start: Point = useMemo<Point>(() => {
    return {
      x: props.nodeA.coordinates.x + props.nodeSize!/2 || 90,
      y: props.nodeA.coordinates.y + props.nodeSize!/2 || 90,
    } as Point;
  }, [props.nodeA.coordinates]);
  const end: Point = useMemo<Point>(() => {
    return {
      x: props.nodeB.coordinates.x + props.nodeSize!/2 || 90,
      y: props.nodeB.coordinates.y + props.nodeSize!/2 || 90,
    } as Point;
  }, [props.nodeB.coordinates]);
  const positionInfo = useMemo<{isFurther:boolean,isAbove:boolean }>(() => {
    return{isFurther:start.x<end.x,isAbove: start.y>end.y};
  }, [start,end]);
  const lenght = useMemo<number>(() => {
    return Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2),
    );
  }, [start,end]);
  const trigonometryValue = useMemo<number>(() => {
    const deltaY:number=Math.abs(props.nodeA.coordinates.y - props.nodeB.coordinates.y);
    return deltaY/lenght;
  },[start,end]);
  const angle = useMemo<number>(() => {
    if(positionInfo.isFurther&&positionInfo.isAbove){
     return 270+toDeg(Math.acos(trigonometryValue));
    }
    if(!positionInfo.isFurther&&positionInfo.isAbove){
      return 180+toDeg(Math.asin(trigonometryValue));
    }
    if(!positionInfo.isAbove&&positionInfo.isFurther){
      return toDeg(Math.asin(trigonometryValue));
    }
    if(!positionInfo.isAbove&&!positionInfo.isFurther){
      return 90+toDeg(Math.acos(trigonometryValue));
    }
    return -45;

  }, [lenght,trigonometryValue]);

  return (
    <div
      className={`absolute transform origin-left`}
      style={{
        zIndex:'39',
        left: `${start.x}px`,
        top: `${start.y}px`,
        width: `${lenght || 300}px`,
        height: `${props.width || 20}px`,
        transform: `rotate(${angle}deg)`,
        paddingInline:`${(props.nodeSize||90)/2}px`,
        paddingBlock:'0px',
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`bg-white shadow-2xl h-full w-full rounded-b border-2 border-gray-300 m-0 
          ${props.isDirected?'-translate-y-2.5':''}
          `}
        >
          <div className={`bg-white shadow-2xl h-full w-full rounded-b m-0`}>

          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{props.nodeA.name+"<==>"+props.nodeB.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>id: {props.id}</DropdownMenuItem>
          <DropdownMenuItem>nodeA.id:{props.nodeA.id}</DropdownMenuItem>
          <DropdownMenuItem>nodeB.id:{props.nodeB.id}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
