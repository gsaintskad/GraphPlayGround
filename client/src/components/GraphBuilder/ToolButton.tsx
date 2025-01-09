import React, { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcnUI/hover-card.tsx";
import { Button } from "@/components/shadcnUI/button.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { GraphBuilderTool } from "@/redux/GraphBuilder/actionTypes.ts";

interface InstrumentButtonProps {
  children: ReactNode | ReactNode[];
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  description?: string;
  tool?: GraphBuilderTool;
  isAlwaysActive?: boolean;
}
// React.MouseEventHandler<HTMLButtonElement>
const ToolButton = (props: InstrumentButtonProps) => {
  const {isAlwaysActive} = props;
  const activeTool = useSelector(
    (state: RootState) => state.graphBuilderTool.currentTool,
  );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          // disabled={props.isAlwaysActive&&activeTool === GraphBuilderTool.PLAY_ANIMATION}
          disabled={activeTool === GraphBuilderTool.PLAY_ANIMATION}
          variant="default"
          className={activeTool === props.tool ? "bg-yellow-600/60" : ""}
          onClick={props.onClick}
        >
          {props.children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-600 bg-gray-900 text-white //dark:bg-gray-800">
        <div className="flex space-x-4">
          {props.children}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{props.name}</h4>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ToolButton;
