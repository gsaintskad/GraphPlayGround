import React, { ReactNode} from 'react';
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/shadcnUI/hover-card.tsx";
import {Button} from "@/components/shadcnUI/button.tsx";

interface InstrumentButtonProps {
  children: ReactNode|ReactNode[];
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  description?: string;
}
// React.MouseEventHandler<HTMLButtonElement>
const InstrumentButton = (props:InstrumentButtonProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="h-10 w-10" variant="default" onClick={props.onClick}>{props.children}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-600 bg-gray-900 text-white //dark:bg-gray-800">
        <div className="flex space-x-4">
          {props.children}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{props.name}</h4>
            <p className="text-sm">
              {props.description}
            </p>

          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
};

export default InstrumentButton;