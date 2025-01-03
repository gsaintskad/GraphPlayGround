import React, { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcnUI/breadcrumb.tsx";
import { Slash } from "lucide-react";
import * as querystring from "node:querystring";

const BreadCrumb = () => {
  const path = useMemo(() => {
    return location.pathname.split("/").filter((i) => i);
  }, [location.pathname]);

  console.log(path)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Algorithmer</BreadcrumbLink>
        </BreadcrumbItem>
        {!!path.length&&<BreadcrumbSeparator/>}
        {path.length > 2 &&<>...<BreadcrumbSeparator/></> }
        {path.map((subDomen,index) => {
          if(index<path.length-2||subDomen==='' ) {
            return '';
          }
          return (
            <React.Fragment key={`breadcrumb-${index}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path.slice(0, index+1).join('/')}`}>{subDomen}</BreadcrumbLink>
              </BreadcrumbItem>
              {index<path.length-1&&<BreadcrumbSeparator/>}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
