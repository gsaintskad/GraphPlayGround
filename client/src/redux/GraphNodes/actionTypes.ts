import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { Point } from "../../../types.ts";
import {AnyAction} from "@reduxjs/toolkit";

export enum GraphNodeActionTypes {
  ADD_NODE = "ADD_NODE",
  REMOVE_NODE = "REMOVE_NODE",
  SET_NODES_IS_ACTIVE = "SET_NODES_IS_ACTIVE",
  SELECT_NODE = "SELECT_NODE",
  DESELECT_NODE = "DESELECT_NODE",
  DISCARD_SELECTION = "DISCARD_SELECTION",
  MOVE_NODE = "MOVE_NODE",
}
interface addNodeAction extends AnyAction{
  type: GraphNodeActionTypes.ADD_NODE;
  payload: GraphNodeProps;
}
interface deselectNodeAction extends AnyAction{
  type: GraphNodeActionTypes.DESELECT_NODE;
  payload: GraphNodeProps;
}
interface removeNodeAction extends AnyAction {
  type: GraphNodeActionTypes.REMOVE_NODE;
  payload: string;
}
interface setNodesIsActiveAction extends AnyAction{
  type: GraphNodeActionTypes.SET_NODES_IS_ACTIVE;
  payload: boolean;
}
interface selectNodeAction extends AnyAction{
  type: GraphNodeActionTypes.SELECT_NODE;
  payload: GraphNodeProps;
}

interface discardNodeSelectionAction extends AnyAction {
  type: GraphNodeActionTypes.DISCARD_SELECTION;
  payload: null;
}
interface setNodeCoordinatesAction extends AnyAction{
  type: GraphNodeActionTypes.MOVE_NODE;
  payload: { nodeCoordinates: Point; id: string };
}
export type GraphNodeAction =
  | addNodeAction
  | removeNodeAction
  | setNodeCoordinatesAction
  | selectNodeAction
  | discardNodeSelectionAction
  | deselectNodeAction
  | setNodesIsActiveAction;
