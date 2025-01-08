import { GraphNodeProps } from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { Point } from "../../lib/types.ts";
import { AnyAction } from "@reduxjs/toolkit";
import { GraphEdgesActionTypes } from "@/redux/GraphEdges/actionTypes.ts";

export enum GraphNodeActionTypes {
  ADD_NODE = "ADD_NODE",
  REMOVE_NODE = "REMOVE_NODE",
  SET_NODES_IS_ACTIVE = "SET_NODES_IS_ACTIVE",
  SELECT_NODE = "SELECT_NODE",
  SET_NODE_AS_SECONDARY = "SET_NODE_AS_SECONDARY",
  SET_NODE_AS_COMPARING = "SET_NODE_AS_COMPARING",
  SET_NODE_AS_PRIMARY = "SET_NODE_AS_PRIMARY",
  MARK_NODE_AS_VISITED = "MARK_NODE_AS_VISITED",
  RESET_NODE_MAP_STATE = "RESET_NODE_MAP_STATE",
  DESELECT_NODE = "DESELECT_NODE",
  DISCARD_SELECTION = "DISCARD_SELECTION",
  MOVE_NODE = "MOVE_NODE",
  SET_NODE_NAME = "SET_NODE_NAME",
  DISCARD_NODE_MAP = "DISCARD_NODE_MAP",
  SET_NODE_AS_SELECTED = "SET_NODE_AS_SELECTED",
}
interface setNodeAsSelectedAction extends AnyAction {
  type: GraphNodeActionTypes.SET_NODE_AS_SELECTED;
  payload: string; //id
}

interface setNodeAsSecondaryAction extends AnyAction {
  type: GraphNodeActionTypes.SET_NODE_AS_SECONDARY;
  payload: string; // ID of the node
}

interface setNodeAsComparingAction extends AnyAction {
  type: GraphNodeActionTypes.SET_NODE_AS_COMPARING;
  payload: string; // ID of the node
}

interface setNodeAsPrimaryAction extends AnyAction {
  type: GraphNodeActionTypes.SET_NODE_AS_PRIMARY;
  payload: string; // ID of the node
}

interface markNodeAsVisitedAction extends AnyAction {
  type: GraphNodeActionTypes.MARK_NODE_AS_VISITED;
  payload: string; // ID of the node
}

interface resetNodeMapStateAction extends AnyAction {
  type: GraphNodeActionTypes.RESET_NODE_MAP_STATE;
  payload: null; // No payload needed for resetting
}

interface discardNodeMapAction {
  type: GraphNodeActionTypes.DISCARD_NODE_MAP;
  payload: null;
}
interface setNodeNameAction extends AnyAction {
  type: GraphNodeActionTypes.SET_NODE_NAME;
  payload: { id: string; name: string };
}
interface addNodeAction extends AnyAction {
  type: GraphNodeActionTypes.ADD_NODE;
  payload: GraphNodeProps;
}
interface deselectNodeAction extends AnyAction {
  type: GraphNodeActionTypes.DESELECT_NODE;
  payload: GraphNodeProps;
}
interface removeNodeAction extends AnyAction {
  type: GraphNodeActionTypes.REMOVE_NODE;
  payload: string;
}
interface setNodesIsActiveAction extends AnyAction {
  type: GraphNodeActionTypes.SET_NODES_IS_ACTIVE;
  payload: boolean;
}
interface selectNodeAction extends AnyAction {
  type: GraphNodeActionTypes.SELECT_NODE;
  payload: GraphNodeProps;
}

interface discardNodeSelectionAction extends AnyAction {
  type: GraphNodeActionTypes.DISCARD_SELECTION;
  payload: null;
}
interface setNodeCoordinatesAction extends AnyAction {
  type: GraphNodeActionTypes.MOVE_NODE;
  payload: { nodeCoordinates: Point; id: string };
}
export type GraphNodeAction =
  | setNodeAsSelectedAction
  | discardNodeMapAction
  | setNodeNameAction
  | addNodeAction
  | removeNodeAction
  | setNodeCoordinatesAction
  | selectNodeAction
  | discardNodeSelectionAction
  | deselectNodeAction
  | setNodesIsActiveAction
  | setNodeAsSecondaryAction
  | setNodeAsComparingAction
  | setNodeAsPrimaryAction
  | markNodeAsVisitedAction
  | resetNodeMapStateAction;
