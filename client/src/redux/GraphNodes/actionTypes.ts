import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";

export type GraphNodesActionsTypes = 'ADD_NODE' |'MOVE_NODE'| 'REMOVE_NODE'|'CONNECT_NODES'|'SET_NODES_IS_ACTIVE'|'SELECT_NODE'|'DISCARD_SELECTION'|'DESELECT_NODE';
export const ADD_NODE:GraphNodesActionsTypes = 'ADD_NODE';
export const REMOVE_NODE:GraphNodesActionsTypes = 'REMOVE_NODE';
export const CONNECT_NODES:GraphNodesActionsTypes = 'CONNECT_NODES';
export const SET_NODES_IS_ACTIVE:GraphNodesActionsTypes = 'SET_NODES_IS_ACTIVE';
export const SELECT_NODE:GraphNodesActionsTypes = 'SELECT_NODE';
export const DESELECT_NODE:GraphNodesActionsTypes = 'DESELECT_NODE';
export const DISCARD_SELECTION:GraphNodesActionsTypes = 'DISCARD_SELECTION';
export const MOVE_NODE:GraphNodesActionsTypes='MOVE_NODE';
