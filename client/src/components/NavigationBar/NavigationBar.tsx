import React from "react";
import { ModeToggle } from "@/components/shadcnUI/ModeToggle.tsx";
import LanguageSelect from "@/components/LanguageSelect.tsx";
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/shadcnUI/navigation-menu.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/shadcnUI/breadcrumb.tsx";
import {Slash} from "lucide-react";
import {Button} from "@/components/shadcnUI/button.tsx";

const NavigationBar = () => {
  return (
    <div className={"flex justify-between items-center bg-zinc-700/10 text-foreground px-[2em] py-[0.5em] m-[1em] rounded-3xl"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button onClick={()=>console.log(location)}>loc</Button>

      <div className={"flex gap-x-6"}>
        <ModeToggle />
        <LanguageSelect />
      </div>
    </div>
  );
};

export default NavigationBar;
