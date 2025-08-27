import React from "react";
import { ModeToggle } from "@/components/shadcnUI/ModeToggle";
import LanguageSelect from "@/components/NavigationBar/LanguageSelect";
import { Button } from "@/components/shadcnUI/button";
import BreadCrumb from "@/components/NavigationBar/BreadCrumb";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavigationBar/NavLink";
import { PiGraphBold } from "react-icons/pi";

const NavigationBar = () => {

  return (
    <div className={"flex justify-between items-center bg-zinc-700/10 sticky text-foreground px-[2em] py-[0.5em] m-[1em] rounded-3xl"}>
      {/*<BreadCrumb/>*/}
      <div className="flex justify-center items-center space-x-2">
        <PiGraphBold className="text-[40px]" />
        <NavLink to="/">Algorithmer</NavLink>
      </div>
      <div className="flex items-center gap-x-5">


        <NavLink to="/GraphBuilder" >Graph Builder</NavLink>


        <NavLink to="/BTreeBuilder">BTree Builder</NavLink>
        <NavLink to="/About">About</NavLink>
      </div>


      <div className={"flex gap-x-6"}>
        <ModeToggle />
        <LanguageSelect />
      </div>
    </div>
  );
};

export default NavigationBar;
