import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { Point } from "../../../types.ts";

export enum GraphNodeActionTypes {
  ADD_NODE = "ADD_NODE",
  REMOVE_NODE = "REMOVE_NODE",
  SET_NODES_IS_ACTIVE = "SET_NODES_IS_ACTIVE",
  SELECT_NODE = "SELECT_NODE",
  DESELECT_NODE = "DESELECT_NODE",
  DISCARD_SELECTION = "DISCARD_SELECTION",
  MOVE_NODE = "MOVE_NODE",
}
interface addNodeAction {
  type: GraphNodeActionTypes.ADD_NODE;
  payload: GraphNodeProps;
}
interface deselectNodeAction {
  type: GraphNodeActionTypes.DESELECT_NODE;
  payload: GraphNodeProps;
}
interface removeNodeAction {
  type: GraphNodeActionTypes.REMOVE_NODE;
  payload: string;
}
interface setNodesIsActiveAction {
  type: GraphNodeActionTypes.SET_NODES_IS_ACTIVE;
  payload: boolean;
}
interface selectNodeAction {
  type: GraphNodeActionTypes.SELECT_NODE;
  payload: GraphNodeProps;
}

interface discardNodeSelectionAction {
  type: GraphNodeActionTypes.DISCARD_SELECTION;
  payload: null;
}
interface setNodeCoordinatesAction {
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
