import React, {ReactNode} from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/shadcnUI/sheet.tsx";
import { Button } from "@/components/shadcnUI/button.tsx";
import { Input } from "@/components/shadcnUI/input.tsx";
import { Label } from "@/components/shadcnUI/label.tsx";
import {Slider} from "@/components/shadcnUI/slider.tsx";

import InstrumentButton from "@/components/InstrumentButton.tsx";

const GraphBuilderSettingsSheet = ({children}:{children:ReactNode}) => {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button>{children}</Button>
        {/*<InstrumentButton name="Graph display settings" description="Here you can change display parameters such as node size, node colors etc...">*/}
        {/*  {children}*/}
        {/*</InstrumentButton>*/}
      </SheetTrigger>
      <SheetContent className={'bg-gray-800 text-white'}>
        <SheetHeader className={'text-white'}>
          <SheetTitle className={'text-white'}>Edit Profile</SheetTitle>
          <SheetDescription className={'text-gray-300'}>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className={'flex flex-col gap-y-10 my-10'}>

          <div><Label>Node size:</Label><Slider className={"bg-white rounded-full"} onChange={()=>console.log('sliderValueHasBeenChanged')} defaultValue={[90]} max={200} min={50} step={15}/></div>

        </div>


        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default GraphBuilderSettingsSheet;
