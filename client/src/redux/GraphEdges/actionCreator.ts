import {GraphEdgesActionTypes, GraphEdgeAction} from "./actionTypes.ts";
import { GraphEdgeProps } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";

export const addEdge = (edgeDto: GraphEdgeProps):GraphEdgeAction => {
  return {
    type: GraphEdgesActionTypes.ADD_EDGE,
    payload: edgeDto,
  };
};
export const setEdgesIsActive = (isActive: boolean):GraphEdgeAction => {
  return {
    type: GraphEdgesActionTypes.SET_EDGES_IS_ACTIVE,
    payload: isActive,
  };
};
export const calculateEdgeProps = (nodeDto: GraphNodeProps):GraphEdgeAction => {
  return {
    type: GraphEdgesActionTypes.CALCULATE_PROPS,
    payload: nodeDto,
  };
};
export const removeEdge = (id: string):GraphEdgeAction => {
  return {
    type: GraphEdgesActionTypes.REMOVE_EDGE,
    payload: id,
  };
};
export const removeEdgesForNode = (nodeId: string):GraphEdgeAction => {
  return {
    type: GraphEdgesActionTypes.REMOVE_EDGES_CONNECTING_NODE,
    payload: nodeId,
  };
};
