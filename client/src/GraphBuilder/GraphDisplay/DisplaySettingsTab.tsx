import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/shadcnUI/tabs.tsx";
import {Label} from "@/components/shadcnUI/label.tsx";
import {Slider} from "@/components/shadcnUI/slider.tsx";
import {ColorPicker} from "@/components/shadcnUI/color-picker.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {DisplaySettingsState} from "@/redux/DisplaySettings/reducer.ts";
import {
  setEdgeBorderColor,
  setEdgeColor, setEdgeWidth,
  setNodeBorderColor,
  setNodeColor, setNodeSize
} from "@/redux/DisplaySettings/actionCreator.ts";

interface DisplaySettingsTabProps{
  className?:string,
  isSettingsHidden:boolean,
}
const DisplaySettingsTab = (props:DisplaySettingsTabProps) => {
  const dispatch=useDispatch()
  const displaySettings:DisplaySettingsState = useSelector((state: RootState) => state.displaySettings);
  return (
    <Tabs
      defaultValue="GraphInfo"
      className={`w-[30em] `}
      hidden={props.isSettingsHidden}
    >
      <TabsList
        hidden={props.isSettingsHidden}
        className={` flex items-center justify-center px-2`}
      >
        <TabsTrigger value="GraphInfo">Graph Info</TabsTrigger>
        <TabsTrigger value="DisplaySettings">
          Display Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="GraphInfo"
        className="px-10 gap-y-6 flex flex-col relative"
      >

      </TabsContent>
      <TabsContent
        value="DisplaySettings"
        className="px-10 gap-y-6 flex flex-col relative"
      >
        <h1>Node customization</h1>
        <div>
          <Label>Node size:</Label>
          <Slider
            className={"bg-white rounded-full"}
            onValueChange={(v)=>dispatch(setNodeSize(v[0]))}
            defaultValue={[displaySettings.nodeSize]}
            max={200}
            min={50}
            step={15}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 text-nowrap mr-3">Node color:</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setNodeColor(v));
            }}
            value={displaySettings.nodeColor}
            className={"w-40"}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20  mr-3">Node border color:</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setNodeBorderColor(v));
            }}
            value={displaySettings.nodeBorderColor}
            className={"w-40"}
          />
        </div>
        <br/>
        <h1>Edge customization</h1>
        <div>
          <Label>Edge width:</Label>
          <Slider
            className={"bg-white rounded-full"}
            onValueChange={(v)=> {
              dispatch(setEdgeWidth(v[0]))

            }}
            defaultValue={[displaySettings.edgeWidth]}
            max={50}
            min={5}
            step={5}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 text-nowrap mr-3">Edge color:</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setEdgeColor(v));
            }}
            value={displaySettings.edgeColor}
            className={"w-40"}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20  mr-3">Edge border color:</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setEdgeBorderColor(v));
            }}
            value={displaySettings.edgeBorderColor}
            className={"w-40"}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DisplaySettingsTab;