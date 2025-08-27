import {

  GraphNodeProps,
} from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { Point } from "../../lib/types";
import { GraphNodeAction, GraphNodeActionTypes, GraphNodeAlgorithmStates } from "./actionTypes";

// Action Creator for adding a node
export const addNode = (nodeDto: GraphNodeProps): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.ADD_NODE,
    payload: nodeDto,
  };
};

// Action Creator for setting nodes' active state
export const setNodesIsActive = (isActive: boolean): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.SET_NODES_IS_ACTIVE,
    payload: isActive,
  };
};

// Action Creator for selecting a node
export const selectNode = (nodeDto: GraphNodeProps): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.SELECT_NODE,
    payload: nodeDto,
  };
};

// Action Creator for discarding selection
export const discardSelection = (): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.DISCARD_SELECTION,
    payload: null,
  };
};

// Action Creator for setting node coordinates
export const setNodeCoordinates = (
  id: string,
  nodeCoordinates: Point,
): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.MOVE_NODE,
    payload: { id, nodeCoordinates },
  };
};

// Action Creator for discarding the node map
export const discardNodeMap = (): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.DISCARD_NODE_MAP,
    payload: null,
  };
};

// Action Creator for removing a node
export const removeNode = (id: string): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.REMOVE_NODE,
    payload: id,
  };
};

// Action Creator for setting a node's name
export const setNodeName = (id: string, name: string): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.SET_NODE_NAME,
    payload: { id, name },
  };
};

// New Actions Below:
export const setAlgorithmState = (
  id: string,
  algorithmState: GraphNodeAlgorithmStates,
): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.SET_NODE_ALGORITHM_STATE,
    payload: { id, algorithmState },
  };
};
export const discardAlgorithmState = (): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.DISCARD_ALGORITHM_STATE,
    payload: null,
  };
};
//
// Action Creator for resetting the node map state
export const resetNodeMapState = (): GraphNodeAction => {
  return {
    type: GraphNodeActionTypes.RESET_NODE_MAP_STATE,
    payload: null,
  };
};
