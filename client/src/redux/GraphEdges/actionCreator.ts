import * as a from './actionTypes.ts'
import {GraphEdgeProps} from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";

export const addEdge = (edgeDto:GraphEdgeProps)=>{
    return {
        type:a.ADD_EDGE,
        payload:edgeDto
    }
}
export const setEdgesIsActive=(isActive:boolean)=>{
    return {
        type: a.SET_EDGES_IS_ACTIVE,
        payload:isActive
    }
}
export const calculateEdgeProps=(nodeDto:GraphNodeProps)=>{
    return {
        type:a.CALCULATE_PROPS,
        payload:nodeDto
    }
}