import React, { useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcnUI/tabs.tsx";
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
  setNodeColors,
  setNodeSize,
  setNodeFontColor,
  setNodeFontSize,
  setWeightFontSize,
  setWeightColor,
} from "@/redux/DisplaySettings/actionCreator.ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcnUI/accordion.tsx";
import { i18n } from "@/lib/i18n.ts";

interface DisplaySettingsTabProps {
  className?: string;
  isSettingsHidden: boolean;
}

const DisplaySettingsTab = (props: DisplaySettingsTabProps) => {
  const dispatch = useDispatch();
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language],
  );

  // Local state for settings
  const [localSettings, setLocalSettings] = useState<DisplaySettingsState>({
    nodeSize: displaySettings.nodeSize,
    nodeColors: { ...displaySettings.nodeColors },
    nodeBorderColor: displaySettings.nodeBorderColor,
    edgeColor: displaySettings.edgeColor,
    edgeBorderColor: displaySettings.edgeBorderColor,
    edgeWidth: displaySettings.edgeWidth,
    weightColor: displaySettings.weightColor,
    weightFontSize: displaySettings.weightFontSize,
    nodeFontColor: displaySettings.nodeFontColor,
    nodeFontSize: displaySettings.nodeFontSize,
    language: displaySettings.language,
  });

  const handleNodeSettingsSubmit = () => {
    dispatch(setNodeSize(localSettings.nodeSize));
    dispatch(setNodeColors(localSettings.nodeColors));
    dispatch(setNodeBorderColor(localSettings.nodeBorderColor));
    dispatch(setNodeFontColor(localSettings.nodeFontColor));
    dispatch(setNodeFontSize(localSettings.nodeFontSize));
  };

  const handleEdgeSettingsSubmit = () => {
    dispatch(setEdgeColor(localSettings.edgeColor));
    dispatch(setEdgeBorderColor(localSettings.edgeBorderColor));
  };

  const handleWeightSettingsSubmit = () => {
    dispatch(setWeightColor(localSettings.weightColor));
    dispatch(setWeightFontSize(localSettings.weightFontSize));
  };

  const handleSubmitAll = () => {
    handleNodeSettingsSubmit();
    handleEdgeSettingsSubmit();
    handleWeightSettingsSubmit();
  };

  const handleChange = (
    field: keyof DisplaySettingsState,
    value:
      | number
      | string
      | {
          primary?: string;
          secondary?: string;
          selected?: string;
          comparing?: string;
          visited?: string;
        },
  ) => {
    setLocalSettings((prev) => {
      if (field === "nodeColors" && typeof value === "object") {
        return {
          ...prev,
          nodeColors: { ...prev.nodeColors, ...value },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <Tabs
      defaultValue="GraphInfo"
      className={`w-[32em]  overflow-y-auto`}
      hidden={props.isSettingsHidden}
    >
      <TabsList
        hidden={props.isSettingsHidden}
        className={`flex items-center justify-center px-2`}
      >
        <TabsTrigger value="GraphInfo">
          {language.displaySettingsTab.tabs.graphInfo}
        </TabsTrigger>
        <TabsTrigger value="DisplaySettings">
          {language.displaySettingsTab.tabs.displaySettings}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="GraphInfo"
        className="px-10 gap-y-6 flex flex-col relative"
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent
        value="DisplaySettings"
        className="px-10 gap-y-6 flex flex-col relative "
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h1>{language.displaySettingsTab.headings.nodeCustomization}</h1>
            </AccordionTrigger>
            <AccordionContent className="px-5 gap-y-6 flex flex-col relative">
              <div>
                <Label>{language.displaySettingsTab.labels.nodeSize}</Label>
                <Slider
                  className={"bg-white rounded-full"}
                  onValueChange={(v) => handleChange("nodeSize", v[0])}
                  defaultValue={[localSettings.nodeSize]}
                  max={200}
                  min={50}
                  step={15}
                />
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Node colors</AccordionTrigger>

                  <AccordionContent className="px-5 gap-y-6 flex flex-col relative">
                    <div className="flex items-center">
                      <Label className="w-20 text-nowrap mr-3">Primary:</Label>
                      <ColorPicker
                        onChange={(v) =>
                          handleChange("nodeColors", { primary: v })
                        }
                        value={localSettings.nodeColors.primary}
                        className={"w-28"}
                      />
                    </div>
                    <div className="flex items-center">
                      <Label className="w-20 text-nowrap mr-3">
                        Secondary:
                      </Label>
                      <ColorPicker
                        onChange={(v) =>
                          handleChange("nodeColors", { secondary: v })
                        }
                        value={localSettings.nodeColors.secondary}
                        className={"w-28"}
                      />
                    </div>
                    <div className="flex items-center">
                      <Label className="w-20 text-nowrap mr-3">Selected:</Label>
                      <ColorPicker
                        onChange={(v) =>
                          handleChange("nodeColors", { selected: v })
                        }
                        value={localSettings.nodeColors.selected}
                        className={"w-28"}
                      />
                    </div>
                    <div className="flex items-center">
                      <Label className="w-20 text-nowrap mr-3">
                        Comparing:
                      </Label>
                      <ColorPicker
                        onChange={(v) =>
                          handleChange("nodeColors", { comparing: v })
                        }
                        value={localSettings.nodeColors.comparing}
                        className={"w-28"}
                      />
                    </div>
                    <div className="flex items-center">
                      <Label className="w-20 text-nowrap mr-3">Visited:</Label>
                      <ColorPicker
                        onChange={(v) =>
                          handleChange("nodeColors", { visited: v })
                        }
                        value={localSettings.nodeColors.visited}
                        className={"w-28"}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex items-center">
                <Label className="w-20 mr-3">
                  {language.displaySettingsTab.labels.nodeBorderColor}
                </Label>
                <ColorPicker
                  onChange={(v) => handleChange("nodeBorderColor", v)}
                  value={localSettings.nodeBorderColor}
                  className={"w-28"}
                />
              </div>
              <div className="flex items-center">
                <Label className="w-20 mr-3">
                  {language.displaySettingsTab.labels.nodeTextColor}
                </Label>
                <ColorPicker
                  onChange={(v) => handleChange("nodeFontColor", v)}
                  value={localSettings.nodeFontColor}
                  className={"w-28"}
                />
              </div>
              <div>
                <Label>{language.displaySettingsTab.labels.nodeFontSize}</Label>
                <Slider
                  className={"bg-white rounded-full"}
                  onValueChange={(v) => handleChange("nodeFontSize", v[0])}
                  defaultValue={[localSettings.nodeFontSize]}
                  max={50}
                  min={2}
                  step={1}
                />
              </div>
              <button
                onClick={handleNodeSettingsSubmit}
                className="mt-4 p-2 bg-green-500 text-white rounded"
              >
                Save Node Settings
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <br />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h1>{language.displaySettingsTab.headings.edgeCustomization}</h1>
            </AccordionTrigger>
            <AccordionContent className="px-5 gap-y-6 flex flex-col relative">
              <div className="flex items-center">
                <Label className="w-20 text-nowrap mr-3">
                  {language.displaySettingsTab.labels.edgeColor}
                </Label>
                <ColorPicker
                  onChange={(v) => handleChange("edgeColor", v)}
                  value={localSettings.edgeColor}
                  className={"w-28"}
                />
              </div>
              <div className="flex items-center">
                <Label className="w-20 text-nowrap mr-3">
                  {language.displaySettingsTab.labels.edgeBorderColor}
                </Label>
                <ColorPicker
                  onChange={(v) => handleChange("edgeBorderColor", v)}
                  value={localSettings.edgeBorderColor}
                  className={"w-28"}
                />
              </div>
              <button
                onClick={handleEdgeSettingsSubmit}
                className="mt-4 p-2 bg-green-500 text-white rounded"
              >
                Save Edge Settings
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <br />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h1>
                displaySettingsTab.weightCustomization
                {/*{language.displaySettingsTab.headings.weightCustomization}*/}
              </h1>
            </AccordionTrigger>
            <AccordionContent className="px-5 gap-y-6 flex flex-col relative">
              <div className="flex items-center">
                <Label className="w-20 mr-3">
                  {language.displaySettingsTab.labels.weightFontColor}
                </Label>
                <ColorPicker
                  onChange={(v) => handleChange("weightColor", v)}
                  value={localSettings.weightColor}
                  className={"w-28"}
                />
              </div>
              <div>
                <Label>
                  {language.displaySettingsTab.labels.weightFontSize}
                </Label>
                <Slider
                  className={"bg-white rounded-full"}
                  onValueChange={(v) => handleChange("weightFontSize", v[0])}
                  defaultValue={[localSettings.weightFontSize]}
                  max={50}
                  min={2}
                  step={1}
                />
              </div>
              <button
                onClick={handleWeightSettingsSubmit}
                className="mt-4 p-2 bg-green-500 text-white rounded"
              >
                Save Weight Settings
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button
          onClick={handleSubmitAll}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit All
        </button>
      </TabsContent>
    </Tabs>
  );
};

export default DisplaySettingsTab;
