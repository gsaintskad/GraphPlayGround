import {GraphEdgesActionTypes} from "./actionTypes.ts";
import {Reducer} from "@reduxjs/toolkit";
import {stateObject} from "../../../types.ts";
import {GraphEdgeProps} from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import {rootAction} from "@/redux/store.ts";

const initialState: stateObject<GraphEdgeProps> = {};

const graphEdgesReducer: Reducer<
  stateObject<GraphEdgeProps>,
  rootAction
> = (state = initialState, action:rootAction): stateObject<GraphEdgeProps> => {
  switch (action.type) {
    case GraphEdgesActionTypes.ADD_EDGE: {
      const prevState = structuredClone(state);
      const payload = action.payload as GraphEdgeProps;
      prevState[payload.id] = payload;
      return prevState;
    }
    case GraphEdgesActionTypes.REMOVE_EDGE: {
      const targetId = action.payload as string;
      const prevState = structuredClone(state);
      const newState: stateObject<GraphEdgeProps> = {};
      for (const id in prevState) {
        if (id !== targetId) {
          newState[id] = prevState[id];
        }
      }
      return newState;
    }
    case GraphEdgesActionTypes.REMOVE_EDGES_CONNECTING_NODE: {
      const prevState = structuredClone(state);
      const newState: stateObject<GraphEdgeProps> = {};
      for (const id in prevState) {
        if (!id.split("-").includes(action.payload)) {
          newState[id] = prevState[id];
        }
      }
      return newState;
    }
    case GraphEdgesActionTypes.DISCARD_EDGE_MAP:{
      return {} satisfies stateObject<string>
    }
    case GraphEdgesActionTypes.SET_WEIGHT: {
      const prevState = structuredClone(state);
      prevState[action.payload.id].weight = action.payload.weight;
      return prevState;
    }
    case GraphEdgesActionTypes.SET_EDGES_IS_ACTIVE: {
      const prevState = structuredClone(state);
      for (const k in prevState) {
        prevState[k].isActive = !!action.payload;
      }
      return prevState;
    }
    // case GraphEdgesActionTypes.CALCULATE_PROPS: {
    //   const prevState = structuredClone(state);
    //   for (const id in prevState) {
    //     if (prevState[id].nodeA.id === action.payload.id) {
    //       prevState[id].nodeA = action.payload;
    //     } else if (prevState[id].nodeB.id === action.payload.id) {
    //       prevState[id].nodeB = action.payload;
    //     }
    //   }
    //
    //   return prevState;
    // }
    default:
      return state;
  }
};
export default graphEdgesReducer;
