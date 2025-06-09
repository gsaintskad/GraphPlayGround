import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcnUI/table.tsx";

const GraphInfoTab = () => {
  return (
    <div className="flex flex-col">
      <Table>
        <TableCaption>Algorithm steps</TableCaption>
        <TableHeader className="sticky">
          <TableRow>
            <TableHead className="w-[30px]">Step</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Payload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">oyu</TableCell>
            <TableCell>Set node as </TableCell>
            <TableCell className={"hover:bg-yellow-600/50"}>gh</TableCell>
            <TableCell className="text-right">ghj</TableCell>
          </TableRow>
          {/*))}*/}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              Output : asd // Object! // .entries(
              {/*//   animations[currentAlgorithm]!.output! as stateObject<number>,*/}
              // ){/*// .map(([id, weight]) => (*/}
              {/*//   <Label>*/}
              {/*//     {nodeMap[id].displayValue} : {weight};*/}
              {/*//   </Label>*/}
              {/*// ))*/}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default GraphInfoTab;
