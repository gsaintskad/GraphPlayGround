import React from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/shadcnUI/radio-group.tsx";
import {Label} from "@/components/shadcnUI/label.tsx";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-950 scrollbar-track-zinc-800">
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
      <div className="flex flex-col items-center justify-center bg-zinc-700/40 m-[3em] p-[5em] rounded-3xl">

      <h1 className="text-[7em]   font-black">The Algorithmer</h1>
      <h3 className=" text-xl font-medium">Model, simulate, customize, learn your own graphs and algorithms.</h3>
      </div>


    </div>
  );
};

export default HomePage;