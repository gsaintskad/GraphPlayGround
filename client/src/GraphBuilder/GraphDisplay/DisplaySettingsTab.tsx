import React, {useMemo, useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcnUI/tabs.tsx";
import { Label } from "@/components/shadcnUI/label.tsx";
import { Slider } from "@/components/shadcnUI/slider.tsx";
import { ColorPicker } from "@/components/shadcnUI/color-picker.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer.ts";
import {
  setEdgeBorderColor,
  setEdgeColor,
  setNodeBorderColor,
  setNodeColor,
  setNodeSize,
  setNodeFontColor,
  setNodeFontSize,
  setWeightFontSize,
  setWeightColor,
} from "@/redux/DisplaySettings/actionCreator.ts";

import {i18n} from "@/lib/i18n.ts";
interface DisplaySettingsTabProps {
  className?: string;
  isSettingsHidden: boolean;
}

const DisplaySettingsTab = (props: DisplaySettingsTabProps) => {

  const dispatch = useDispatch();
  const displaySettings: DisplaySettingsState = useSelector((state: RootState) => state.displaySettings);
  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language],
  );
  return (
    <Tabs
      defaultValue="GraphInfo"
      className={`w-[30em]  overflow-y-auto`}
      hidden={props.isSettingsHidden}
    >
      <TabsList
        hidden={props.isSettingsHidden}
        className={`flex items-center justify-center px-2`}
      >
        <TabsTrigger value="GraphInfo">{language.displaySettingsTab.tabs.graphInfo}</TabsTrigger>
        <TabsTrigger value="DisplaySettings">{language.displaySettingsTab.tabs.displaySettings}</TabsTrigger>
      </TabsList>
      <TabsContent
        value="GraphInfo"
        className="px-10 gap-y-6 flex flex-col relative"
      ></TabsContent>
      <TabsContent
        value="DisplaySettings"
        className="px-10 gap-y-6 flex flex-col relative "
      >
        <h1>{language.displaySettingsTab.headings.nodeCustomization}</h1>
        <div>
          <Label>{language.displaySettingsTab.labels.nodeSize}</Label>
          <Slider
            className={"bg-white rounded-full"}
            onValueChange={(v) => dispatch(setNodeSize(v[0]))}
            defaultValue={[displaySettings.nodeSize]}
            max={200}
            min={50}
            step={15}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 text-nowrap mr-3">{language.displaySettingsTab.labels.nodeColor}</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setNodeColor(v));
            }}
            value={displaySettings.nodeColor}
            className={"w-40"}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 mr-3">{language.displaySettingsTab.labels.nodeBorderColor}</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setNodeBorderColor(v));
            }}
            value={displaySettings.nodeBorderColor}
            className={"w-40"}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 mr-3">{language.displaySettingsTab.labels.nodeTextColor}</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setNodeFontColor(v));
            }}
            value={displaySettings.nodeFontColor}
            className={"w-40"}
          />
        </div>
        <div>
          <Label>{language.displaySettingsTab.labels.nodeFontSize}</Label>
          <Slider
            className={"bg-white rounded-full"}
            onValueChange={(v) => dispatch(setNodeFontSize(v[0]))}
            defaultValue={[displaySettings.nodeFontSize]}
            max={50}
            min={2}
            step={1}
          />
        </div>
        <br />
        <h1>{language.displaySettingsTab.headings.edgeCustomization}</h1>

        <div className="flex items-center">
          <Label className="w-20 text-nowrap mr-3">{language.displaySettingsTab.labels.edgeColor}</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setEdgeColor(v));
            }}
            value={displaySettings.edgeColor}
            className={"w-40"}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 mr-3">{language.displaySettingsTab.labels.edgeBorderColor}</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setEdgeBorderColor(v));
            }}
            value={displaySettings.edgeBorderColor}
            className={"w-40"}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-20 mr-3">{language.displaySettingsTab.labels.weightFontColor}</Label>
          <ColorPicker
            onChange={(v) => {
              dispatch(setWeightColor(v));
            }}
            value={displaySettings.weightColor}
            className={"w-40"}
          />
        </div>
        <div>
          <Label>{language.displaySettingsTab.labels.weightFontSize}</Label>
          <Slider
            className={"bg-white rounded-full"}
            onValueChange={(v) => dispatch(setWeightFontSize(v[0]))}
            defaultValue={[displaySettings.weightFontSize]}
            max={50}
            min={2}
            step={1}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DisplaySettingsTab;
