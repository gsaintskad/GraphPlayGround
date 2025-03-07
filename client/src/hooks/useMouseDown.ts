import { setNodesIsActive } from "@/redux/GraphNodes/actionCreator.ts";
import { setEdgesIsActive } from "@/redux/GraphEdges/actionCreator.ts";
import { useCallback, useRef } from "react";
import React from "react";

const useMouseDown = (
  divRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const isMouseDown = useRef(false);
  const mouseDownHandler = useCallback(() => {
    isMouseDown.current = true;
  }, []);
  const mouseUpHandler = useCallback(() => {
    isMouseDown.current = false;
  }, []);
  const setIsMouseDownListenerActive = (addMouseDragEvent: boolean) => {
    if (divRef) {
      const divElement = divRef.current!;
      if (addMouseDragEvent) {
        divElement.addEventListener("mousedown", mouseDownHandler);
        divElement.addEventListener("mouseup", mouseUpHandler);
      } else {
        divElement.removeEventListener("mousedown", mouseDownHandler);
        divElement.removeEventListener("mouseup", mouseUpHandler);
      }
    }
  };
};
