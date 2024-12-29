import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnUI/dropdown-menu.tsx";

import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { useEffect, useMemo, useState } from "react";
import { Point } from "../../../../types.ts";
import { Input } from "@/components/shadcnUI/input.tsx";
import { Button } from "@/components/shadcnUI/button.tsx";
import {useDispatch, useSelector} from "react-redux";
import { setWeight } from "@/redux/GraphEdges/actionCreator.ts";
import {RootState} from "@/redux/store.ts";
import {DisplaySettingsState} from "@/redux/DisplaySettings/reducer.ts";

export interface GraphEdgeProps {
  id: string;
  nodeAid: string;
  nodeBid: string;
  isActive: boolean;

  width: number;
  isDirected?: boolean;
  weight?: number;
}
const toDeg = (angle: number): number => {
  return (angle * 180) / Math.PI;
};

export const GraphEdge = (props: GraphEdgeProps) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);

  const [nodeA, setNodeA] = useState<GraphNodeProps>(nodeMap[props.nodeAid])
  const [nodeB, setNodeB] = useState<GraphNodeProps>(nodeMap[props.nodeBid])
  const [isMiddleEdge, setIsMiddleEdge] = useState<boolean>(true)
  const reverseId = useMemo(() => `${props.nodeBid}-${props.nodeAid}`, []);
  useEffect(() => {
    if(edgeMap[reverseId]){
      setIsMiddleEdge(true)
    }
    else{
      setIsMiddleEdge(false)
    }
  }, [edgeMap[reverseId]]);
  useEffect(() => {
    setNodeA(nodeMap[props.nodeAid]);
    setNodeB(nodeMap[props.nodeBid]);
  }, [nodeMap[props.nodeAid], nodeMap[props.nodeBid]]);
  const dispatch = useDispatch();
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const [input, setInput] = useState<string>(
    props.weight !== undefined ? props.weight.toString() : "",
  );

  const start: Point = useMemo<Point>(() => {
    return {
      x: nodeA.coordinates.x + displaySettings.nodeSize / 2 || 90,
      y: nodeA.coordinates.y + displaySettings.nodeSize / 2 || 90,
    } as Point;
  }, [nodeA.coordinates, displaySettings.nodeSize]);
  const end: Point = useMemo<Point>(() => {
    return {
      x: nodeB.coordinates.x + displaySettings.nodeSize / 2 || 90,
      y: nodeB.coordinates.y + displaySettings.nodeSize / 2 || 90,
    } as Point;
  }, [nodeB.coordinates , displaySettings.nodeSize]);
  const positionInfo = useMemo<{ isFurther: boolean; isAbove: boolean }>(() => {
    return { isFurther: start.x < end.x, isAbove: start.y > end.y };
  }, [start, end]);
  const lenght = useMemo<number>(() => {
    return Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2),
    );
  }, [start, end]);
  const trigonometryValue = useMemo<number>(() => {
    const deltaY: number = Math.abs(
      nodeA.coordinates.y - nodeB.coordinates.y,
    );
    return deltaY / lenght;
  }, [start, end]);
  const angle = useMemo<number>(() => {
    if (positionInfo.isFurther && positionInfo.isAbove) {
      return 270 + toDeg(Math.acos(trigonometryValue));
    }
    if (!positionInfo.isFurther && positionInfo.isAbove) {
      return 180 + toDeg(Math.asin(trigonometryValue));
    }
    if (!positionInfo.isAbove && positionInfo.isFurther) {
      return toDeg(Math.asin(trigonometryValue));
    }
    if (!positionInfo.isAbove && !positionInfo.isFurther) {
      return 90 + toDeg(Math.acos(trigonometryValue));
    }
    return -45;
  }, [lenght, trigonometryValue]);

  return (
    <div
      className={`absolute transform origin-left`}
      style={{
        zIndex: "39",
        left: `${start.x}px`,
        top: `${start.y}px`,
        width: `${lenght || 300}px`,
        height: `10px`,
        transform: `rotate(${angle}deg)`,
        paddingInline: `${(displaySettings.nodeSize || 90) / 2}px`,
        paddingBlock: "0px",
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center shadow-2xl h-full w-full rounded-sm  m-0
          ${isMiddleEdge ? "-translate-y-2.5" : ""}
          `}
          // ${props.isDirected?'-translate-y-2.5':''}
        >
          <div
            className={`flex justify-between p-0 shadow-2xl h-1/2 w-full border-2  rounded-sm m-0`}
            style={{backgroundColor:displaySettings.edgeColor, borderColor:displaySettings.edgeBorderColor}}
          >
            <div/>
            <label
              style={{ transform: `rotate(${-angle}deg) translateX(-10px)`,
                fontSize: `${displaySettings.weightFontSize}px`,
                color: displaySettings.weightColor,
              }}

            >
              {props.weight}
            </label>
            {props.isDirected ? (
              // <div
              //   className={`bg-red-600 shadow-2xl h-full aspect-square rounded-sm m-0`}
              // />
              <span className={' m-0 p-0'} style={{fontSize:'3em', transform:`translateY(-0.86em) translateX(0.25em)`, color:displaySettings.edgeBorderColor}}>{'>'}</span>
            ) : <div/>
            }

          </div>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{`${nodeA.name}${props.isDirected! ? "==>" : "<==>"}${nodeB.name}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>id: {props.id}</DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="number"
                onChange={(e) => setInput(e.target.value)}
                placeholder="value"
                value={input}
              />
              <Button
                type="submit"
                onClick={(e) => {
                  const numericValue = Number(input);
                  if (!isNaN(numericValue)) {
                    dispatch(setWeight(props.id, numericValue));
                  }
                }}
              >
                Set
              </Button>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>nodeA.id:{nodeA.id}</DropdownMenuItem>
          <DropdownMenuItem>nodeB.id:{nodeB.id}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
