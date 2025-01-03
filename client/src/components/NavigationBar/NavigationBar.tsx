import React from "react";
import { ModeToggle } from "@/components/shadcnUI/ModeToggle.tsx";
import LanguageSelect from "@/components/NavigationBar/LanguageSelect.tsx";
import {Button} from "@/components/shadcnUI/button.tsx";
import BreadCrumb from "@/components/NavigationBar/BreadCrumb.tsx";

const NavigationBar = () => {
  return (
    <div className={"flex justify-between items-center bg-zinc-700/10 text-foreground px-[2em] py-[0.5em] m-[1em] rounded-3xl"}>
     <BreadCrumb/>
      <Button onClick={()=>console.log(location)}>loc</Button>

      <div className={"flex gap-x-6"}>
        <ModeToggle />
        <LanguageSelect />
      </div>
    </div>
  );
};

export default NavigationBar;
