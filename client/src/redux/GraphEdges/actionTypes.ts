import { GraphEdgeProps } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";

export enum GraphEdgesActionTypes {
  ADD_EDGE = "ADD_EDGE",
  REMOVE_EDGE = "REMOVE_EDGE",
  SET_EDGES_IS_ACTIVE = "SET_EDGES_IS_ACTIVE",
  CALCULATE_PROPS = "CALCULATE_PROPS",
  REMOVE_EDGES_CONNECTING_NODE = "REMOVE_EDGES_CONNECTING_NODE",
  SET_WEIGHT = "SET_WEIGHT",
}
interface setWeightAction {
  type: GraphEdgesActionTypes.SET_WEIGHT;
  payload: { id: string; weight: number };
}
interface addEdgeAction {
  type: GraphEdgesActionTypes.ADD_EDGE;
  payload: GraphEdgeProps;
}
interface setEdgeIsActive {
  type: GraphEdgesActionTypes.SET_EDGES_IS_ACTIVE;
  payload: boolean;
}
interface calculateEdgePropsAction {
  type: GraphEdgesActionTypes.CALCULATE_PROPS;
  payload: GraphNodeProps;
}
interface removeEdgeAction {
  type: GraphEdgesActionTypes.REMOVE_EDGE;
  payload: string;
}
interface removeEdgesForNodeAction {
  type: GraphEdgesActionTypes.REMOVE_EDGES_CONNECTING_NODE;
  payload: string;
}
export type GraphEdgeAction =
  | addEdgeAction
  | removeEdgeAction
  | calculateEdgePropsAction
  | setEdgeIsActive
  | setWeightAction
  | removeEdgesForNodeAction;
