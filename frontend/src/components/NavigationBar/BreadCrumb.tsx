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
import {Link, useLocation} from "react-router-dom";

const BreadCrumb = () => {
  const loc = useLocation();
  const path = useMemo(() => {
    return loc.pathname.split("/").filter((i)=>i);
    // return location.pathname.split("/").filter((i) => i);
  }, [loc]);
  console.log(loc);

  console.log(path)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
         <Link to='/'>Algorithmer</Link>

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

                <Link to={`/${path.slice(0, index+1).join('/')}`}>{subDomen}</Link>
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
