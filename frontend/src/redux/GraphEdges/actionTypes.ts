import { GraphEdgeProps } from "@/components/GraphBuilder/GraphDisplay/GraphEdge";
import { GraphNodeProps } from "@/components/GraphBuilder/GraphDisplay/GraphNode";
import { AnyAction } from "@reduxjs/toolkit";

export enum GraphEdgesActionTypes {
  ADD_EDGE = "ADD_EDGE",
  REMOVE_EDGE = "REMOVE_EDGE",
  SET_EDGES_IS_ACTIVE = "SET_EDGES_IS_ACTIVE",
  CALCULATE_PROPS = "CALCULATE_PROPS",
  REMOVE_EDGES_CONNECTING_NODE = "REMOVE_EDGES_CONNECTING_NODE",
  SET_WEIGHT = "SET_WEIGHT",
  DISCARD_EDGE_MAP = "DISCARD_EDGE_MAP",
}
interface setWeightAction extends AnyAction {
  type: GraphEdgesActionTypes.SET_WEIGHT;
  payload: { id: string; weight: number };
}
interface addEdgeAction extends AnyAction {
  type: GraphEdgesActionTypes.ADD_EDGE;
  payload: GraphEdgeProps;
}
interface setEdgeIsActive extends AnyAction {
  type: GraphEdgesActionTypes.SET_EDGES_IS_ACTIVE;
  payload: boolean;
}
interface discardEdgeMapAction extends AnyAction {
  type: GraphEdgesActionTypes.DISCARD_EDGE_MAP;
  payload: null
}
interface calculateEdgePropsAction extends AnyAction {
  type: GraphEdgesActionTypes.CALCULATE_PROPS;
  payload: GraphNodeProps;
}
interface removeEdgeAction extends AnyAction {
  type: GraphEdgesActionTypes.REMOVE_EDGE;
  payload: string;
}
interface removeEdgesForNodeAction extends AnyAction {
  type: GraphEdgesActionTypes.REMOVE_EDGES_CONNECTING_NODE;
  payload: string;
}
export type GraphEdgeAction =
  | discardEdgeMapAction
  | addEdgeAction
  | removeEdgeAction
  | calculateEdgePropsAction
  | setEdgeIsActive
  | setWeightAction
  | removeEdgesForNodeAction;
