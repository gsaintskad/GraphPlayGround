import { GraphNodeActionTypes, GraphNodeAction } from "./actionTypes.ts";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { Point, stateObject } from "../../../types.ts";
import { GraphEdgeProps } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";

const initialState: stateObject<GraphNodeProps> = {};
const selectedState: GraphNodeProps[] = [];

export const graphNodesReducer: Reducer<
  stateObject<GraphNodeProps>,
  GraphNodeAction
> = (
  state = initialState,
  action: GraphNodeAction,
): stateObject<GraphNodeProps> => {
  switch (action.type) {
    case GraphNodeActionTypes.ADD_NODE: {
      const prevState = structuredClone(state);
      const payload = action.payload as GraphNodeProps;
      prevState[payload.id] = payload;
      return prevState;
    }
    case GraphNodeActionTypes.REMOVE_NODE: {
      const targetId = action.payload as string;
      const prevState = structuredClone(state);
      const newState: stateObject<GraphNodeProps> = {};
      for (const id in prevState) {
        if (id !== targetId) {
          newState[id] = prevState[id];
        }
      }
      return newState;
    }
    case GraphNodeActionTypes.SET_NODES_IS_ACTIVE: {
      const prevState = structuredClone(state);
      for (const k in prevState) {
        prevState[k].isActive = !!action.payload;
      }
      return prevState;
    }
    case GraphNodeActionTypes.MOVE_NODE: {
      const prevState = structuredClone(state);
      const payload = action.payload as { nodeCoordinates: Point; id: string };
      prevState[payload.id] = {
        ...prevState[payload.id],
        coordinates: payload.nodeCoordinates,
      };
      return prevState;
    }
    default:
      return state;
  }
};
export const selectedGraphNodesReducer: Reducer<
  GraphNodeProps[],
  GraphNodeAction
> = (state = selectedState, action: GraphNodeAction): GraphNodeProps[] => {
  switch (action.type) {
    case GraphNodeActionTypes.SELECT_NODE: {
      const prevState = structuredClone(state);
      const payload = structuredClone(action.payload as GraphNodeProps);
      payload.algoritmState = "selected";
      prevState.push(payload);
      return prevState;
    }
    case GraphNodeActionTypes.DISCARD_SELECTION: {
      return [] as GraphNodeProps[];
    }
    default:
      return state;
  }
};
