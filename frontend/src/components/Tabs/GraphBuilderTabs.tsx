import React, { useMemo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcnUI/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcnUI/accordion";
import { Label } from "@/components/shadcnUI/label";
import { Slider } from "@/components/shadcnUI/slider";
import { ColorPicker } from "@/components/shadcnUI/color-picker";
import AlgorithmTab from "@/components/Tabs/TabsContent/AlgorithmTab";
import DisplaySettingsTab from "@/components/Tabs/TabsContent/DisplaySettingsTab";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { i18n } from "@/lib/i18n";
interface GraphBuilderTabsProps {
  className?: string;
  isTabsHidden: boolean;
}
const GraphBuilderTabs = (props: GraphBuilderTabsProps) => {
  const displaySettings: DisplaySettingsState = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language],
  );

  return (
    <div
      className="bg-zinc-700/20  mx-5 rounded-xl overflow-y-auto scrollbar scrollbar-thin dark:scrollbar-thumb-gray-950 dark:scrollbar-track-zinc-800
     light:scrollbar-thumb-gray-200 light:scrollbar-track-zinc-100 max-h-[80vh]"
    >
      <Tabs
        defaultValue="GraphInfo"
        className={`w-[32em]  overflow-y-auto`}
        hidden={props.isTabsHidden}
      >
        <TabsList className={`flex items-center justify-center px-2 sticky`}>
          <TabsTrigger value="GraphInfo">
            {language.displaySettingsTab.tabs.graphInfo}
          </TabsTrigger>
          <TabsTrigger value="DisplaySettings">
            {language.displaySettingsTab.tabs.displaySettings}
          </TabsTrigger>
          <TabsTrigger value="AnimationSettings">
            Animation Settings
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
          <DisplaySettingsTab />
        </TabsContent>
        <TabsContent
          value="AnimationSettings"
          className="px-10 pb-5 gap-y-6 flex flex-col relative"
        >
          <AlgorithmTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GraphBuilderTabs;
