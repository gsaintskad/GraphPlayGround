import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";

export type GraphNodesActionsTypes = 'ADD_NODE' | 'REMOVE_NODE'|'CONNECT_NODES'|'SET_NODES_IS_ACTIVE'
export const ADD_NODE:GraphNodesActionsTypes = 'ADD_NODE';
export const REMOVE_NODE:GraphNodesActionsTypes = 'REMOVE_NODE';
export const CONNECT_NODES:GraphNodesActionsTypes = 'CONNECT_NODES';
export const SET_NODES_IS_ACTIVE:GraphNodesActionsTypes = 'SET_NODES_IS_ACTIVE';
export interface actionPattern{
    type:GraphNodesActionsTypes,
    payload:unknown
}