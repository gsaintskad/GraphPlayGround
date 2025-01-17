import * as a from './actionTypes.ts'
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
export const addNode = (nodeDto:GraphNodeProps)=>{
    return {
        type:a.ADD_NODE,
        payload:nodeDto
    }
}
export const setNodesIsActive=(isActive:boolean)=>{
    return {
        type: a.SET_NODES_IS_ACTIVE,
        payload:isActive
    }
}
export const selectNode = (nodeDto:GraphNodeProps)=>{
    return {
        type:a.SELECT_NODE,
        payload:nodeDto
    }
}
export const discardSelection=()=>{
    return {
        type:a.DISCARD_SELECTION,
        payload:null
    }
}