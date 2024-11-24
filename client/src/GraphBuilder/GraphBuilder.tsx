import { Button } from "@/components/ui/button"
import GraphDisplay from "@/GraphBuilder/GraphDisplay/GraphDisplay.tsx";
import {useState} from "react";
import {GraphBuilderActions} from "./graphBuilderActions.ts";
import {GraphNodeProps} from "@/GraphBuilder/GraphNode/GraphNode.tsx";

export const GraphBuilder=()=>{

    const [activeHandler, setActiveHandler] = useState<GraphBuilderActions>('')

    const toggleHandler=(state:GraphBuilderActions)=>{
        setActiveHandler(state)
    }

    return <div className={`flex flex-col h-full w-full`}>
        <div className={`bg-red-300 h-12 flex justify-center items-center gap-8`}>

        </div>

        <div className={`bg-amber-300 h-full flex`}>
            <div className={`pt-10 flex flex-col h-full bg-red-300 w-20 gap-8`}>
                <Button  onClick={()=>toggleHandler('create')}>create</Button>
                <Button  onClick={()=>toggleHandler('delete')}>delete</Button>
                <Button  onClick={()=>toggleHandler('connect')}>connect</Button>
                <Button  onClick={()=>toggleHandler('disconnect')}>disconnect</Button>
            </div>
            <GraphDisplay activeHandler={activeHandler}/>

        </div>


    </div>
}