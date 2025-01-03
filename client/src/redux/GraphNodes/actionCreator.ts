import {GraphNodeProps} from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import {Point} from "../../lib/types.ts";

import {GraphNodeAction, GraphNodeActionTypes} from "./actionTypes.ts";
import {rootAction} from "@/redux/store.ts";

export const addNode = (nodeDto:GraphNodeProps):rootAction=>{
    return {
        type:GraphNodeActionTypes.ADD_NODE,
        payload:nodeDto
    }
}
export const setNodesIsActive=(isActive:boolean):rootAction=>{
    return {
        type: GraphNodeActionTypes.SET_NODES_IS_ACTIVE,
        payload:isActive
    }
}
export const selectNode = (nodeDto:GraphNodeProps):rootAction=>{
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
export const setNodeCoordinates=(id:string,nodeCoordinates:Point):rootAction=>{
    return {
        type:GraphNodeActionTypes.MOVE_NODE,
        payload:{nodeCoordinates,id}
    }
}
export const discardNodeMap=():rootAction=>{
    return {
        type:GraphNodeActionTypes.DISCARD_NODE_MAP,
        payload:null
    }
}
export const removeNode=(id:string):rootAction=>{
    return{
        type:GraphNodeActionTypes.REMOVE_NODE,
        payload:id
    }
}
export const setNodeName=(id:string,name:string):rootAction=>{
    return {
        type:GraphNodeActionTypes.SET_NODE_NAME,
        payload:{id:id,name:name}
    }
}