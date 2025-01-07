import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnUI/dropdown-menu.tsx";

import { GraphNodeProps } from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { useEffect, useMemo, useState } from "react";
import { Point } from "../../../lib/types.ts";
import { Input } from "@/components/shadcnUI/input.tsx";
import { Button } from "@/components/shadcnUI/button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setWeight } from "@/redux/GraphEdges/actionCreator.ts";
import { RootState } from "@/redux/store.ts";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer.ts";
import { Label } from "@/components/shadcnUI/label.tsx";

export interface GraphEdgeProps {
  id: string;
  nodeAid: string;
  nodeBid: string;
  isActive: boolean;

  width: number;
  isDirected?: boolean;
  weight: number;
}
const toDeg = (angle: number): number => {
  return (angle * 180) / Math.PI;
};

export const GraphEdge = (props: GraphEdgeProps) => {
  const nodeMap = useSelector((state: RootState) => state.graphNodes);
  const edgeMap = useSelector((state: RootState) => state.graphEdges);

  const [nodeA, setNodeA] = useState<GraphNodeProps>(nodeMap[props.nodeAid]);
  const [nodeB, setNodeB] = useState<GraphNodeProps>(nodeMap[props.nodeBid]);
  const [isMiddleEdge, setIsMiddleEdge] = useState<boolean>(true);
  const reverseId = useMemo(() => `${props.nodeBid}-${props.nodeAid}`, []);
  useEffect(() => {
    if (edgeMap[reverseId]) {
      setIsMiddleEdge(true);
    } else {
      setIsMiddleEdge(false);
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

  const isNodeSelfConnected = useMemo<boolean>(() => nodeA.id === nodeB.id, []);
  const start: Point = useMemo<Point>(() => {
    if (isNodeSelfConnected) {
      return {
        x: nodeA.coordinates.x - 1.05 * displaySettings.nodeSize || 90,
        y: nodeA.coordinates.y + displaySettings.nodeSize / 2 || 90,
      } as Point;
    }
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
  }, [nodeB.coordinates, displaySettings.nodeSize]);
  const positionInfo = useMemo<{ isFurther: boolean; isAbove: boolean }>(() => {
    return { isFurther: start.x < end.x, isAbove: start.y > end.y };
  }, [start, end]);
  const lenght = useMemo<number>(() => {
    return Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2),
    );
  }, [start, end]);
  const trigonometryValue = useMemo<number>(() => {
    const deltaY: number = Math.abs(nodeA.coordinates.y - nodeB.coordinates.y);
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
          {isNodeSelfConnected ? (
            <div className="flex items-center">
              <Label >{props.weight}</Label>
              <svg
                width={displaySettings.nodeSize / 2}
                height={displaySettings.nodeSize / 2}
                color={displaySettings.edgeBorderColor}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"

              >
                <path
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>

            </div>
          ) : (
            <div
              className={`flex justify-between p-0 shadow-2xl h-1/2 w-full border-2  rounded-sm m-0`}
              style={{
                backgroundColor: displaySettings.edgeColor,
                borderColor: displaySettings.edgeBorderColor,
              }}
            >
              <div />
              <label
                style={{
                  transform: `rotate(${-angle}deg) translateX(-10px)`,
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
                <span
                  className={" m-0 p-0"}
                  style={{
                    fontSize: "3em",
                    transform: `translateY(-0.86em) translateX(0.25em)`,
                    color: displaySettings.edgeBorderColor,
                  }}
                >
                  {">"}
                </span>
              ) : (
                <div />
              )}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{`${nodeA.displayValue}${props.isDirected! ? "==>" : "<==>"}${nodeB.displayValue}`}</DropdownMenuLabel>
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
