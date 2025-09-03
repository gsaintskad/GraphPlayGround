// components/NavigationBar.tsx
import React from 'react';
import { ModeToggle } from '@/components/ui/ModeToggle';
import NavLink from '@/components/NavigationBar/NavLink'; // Correct import
import { PiGraphBold } from 'react-icons/pi';
// import BreadCrumb from "@/components/NavigationBar/BreadCrumb"; // Uncomment if you want to use it

const NavigationBar = () => {
  return (
    <div className="flex justify-between items-center bg-zinc-700/10 sticky text-foreground px-[2em] py-[0.5em] m-[1em] rounded-3xl">
      {/* <BreadCrumb /> */}
      <div className="flex justify-center items-center space-x-2">
        <PiGraphBold className="text-[40px]" />
        <NavLink to="/">Algorithmer</NavLink>
      </div>
      <div className="flex items-center gap-x-5">
        <NavLink to="/GraphBuilder">Graph Builder</NavLink>
        <NavLink to="/BTreeBuilder">BTree Builder</NavLink>
        <NavLink to="/About">About</NavLink>
      </div>
      <div className="flex gap-x-6">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationBar;