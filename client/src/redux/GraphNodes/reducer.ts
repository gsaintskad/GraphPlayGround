import * as a from "./actionTypes.ts";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { Point, stateObject } from "../../../types.ts";
import {GraphEdgeProps} from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";

const initialState: stateObject<GraphNodeProps> = {};
const selectedState: GraphNodeProps[] = [];

export const graphNodesReducer: Reducer<
  stateObject<GraphNodeProps>,
  AnyAction
> = (state = initialState, action): stateObject<GraphNodeProps> => {
  switch (action.type) {
    case a.ADD_NODE: {
      const prevState = structuredClone(state);
      const payload = action.payload as GraphNodeProps;
      prevState[payload.id] = payload;
      return prevState;
    }
    case a.REMOVE_NODE: {
      const targetId  = action.payload as string;
      const prevState=structuredClone(state);
      const newState:stateObject<GraphNodeProps> = {};
      for (const id in prevState) {
        if(id!==targetId){
          newState[id] = prevState[id];
        }
      }
      return newState;
    }
    case a.SET_NODES_IS_ACTIVE: {
      const prevState = structuredClone(state);
      for (const k in prevState) {
        prevState[k].isActive = !!action.payload;
      }
      return prevState;
    }
    case a.MOVE_NODE: {
      const prevState = structuredClone(state);
      const payload = action.payload as { nodeCoordinates: Point; id: string };
      prevState[payload.id] = {
        ...prevState[payload.id],
        coordinates: payload.nodeCoordinates,
      };
      console.log(`new point`, prevState[payload.id]);
      return prevState;
    }
    default:
      return state;
  }
};
export const selectedGraphNodesReducer: Reducer<GraphNodeProps[], AnyAction> = (
  state = selectedState,
  action,
): GraphNodeProps[] => {
  switch (action.type) {
    case a.SELECT_NODE: {
      const prevState = structuredClone(state);
      const payload = structuredClone(action.payload as GraphNodeProps);
      payload.algoritmState = "selected";
      prevState.push(payload);
      return prevState;
    }
    case a.DISCARD_SELECTION: {
      return [] as GraphNodeProps[];
    }
    default:
      return state;
  }
};
