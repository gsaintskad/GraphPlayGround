
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import {Point} from "../../../types.ts";

import {GraphNodeActionTypes,GraphNodeAction} from "./actionTypes.ts";

export const addNode = (nodeDto:GraphNodeProps):GraphNodeAction=>{
    return {
        type:GraphNodeActionTypes.ADD_NODE,
        payload:nodeDto
    }
}
export const setNodesIsActive=(isActive:boolean):GraphNodeAction=>{
    return {
        type: GraphNodeActionTypes.SET_NODES_IS_ACTIVE,
        payload:isActive
    }
}
export const selectNode = (nodeDto:GraphNodeProps):GraphNodeAction=>{
    return {
        type:GraphNodeActionTypes.SELECT_NODE,
        payload:nodeDto
    }
}
export const discardSelection=():GraphNodeAction=>{
    return {
        type:GraphNodeActionTypes.DISCARD_SELECTION,
        payload:null
    }
}
export const setNodeCoordinates=(id:string,nodeCoordinates:Point):GraphNodeAction=>{
    return {
        type:GraphNodeActionTypes.MOVE_NODE,
        payload:{nodeCoordinates,id}
    }
}
export const removeNode=(id:string):GraphNodeAction=>{
    return{
        type:GraphNodeActionTypes.REMOVE_NODE,
        payload:id
    }
}