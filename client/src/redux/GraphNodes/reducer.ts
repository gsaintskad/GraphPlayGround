import {GraphNodeActionTypes} from "./actionTypes.ts";
import {GraphNodeProps} from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import {Reducer} from "@reduxjs/toolkit";
import {Point, stateObject} from "../../lib/types.ts";
import {rootAction} from "@/redux/store.ts";

const initialState: stateObject<GraphNodeProps> = {};
const selectedState: GraphNodeProps[] = [];

export const graphNodesReducer: Reducer<
  stateObject<GraphNodeProps>,
  rootAction
> = (
  state = initialState,
  action: rootAction,
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
    case GraphNodeActionTypes.DISCARD_NODE_MAP:{
      return {} satisfies stateObject<string>
    }
    case GraphNodeActionTypes.SET_NODES_IS_ACTIVE: {
      const prevState = structuredClone(state);
      for (const k in prevState) {
        prevState[k].isActive = !!action.payload;
      }
      return prevState;
    }
    case GraphNodeActionTypes.SET_NODE_NAME:{
      const prevState = structuredClone(state);
      prevState[action.payload.id].displayValue = action.payload.name;
      return prevState;
    }
    case GraphNodeActionTypes.MOVE_NODE: {
      const prevState = structuredClone(state);
      const payload = action.payload as { nodeCoordinates: Point; id: string };
      prevState[payload.id] = {
        ...prevState[payload.id],
        coordinates: payload.nodeCoordinates,
      };
      // store.dispatch(calculateEdgeProps(prevState[payload.id]));
      return prevState;
    }
    default:
      return state;
  }
};
export const selectedGraphNodesReducer: Reducer<
  GraphNodeProps[],
  rootAction
> = (state = selectedState, action: rootAction): GraphNodeProps[] => {
  switch (action.type) {
    case GraphNodeActionTypes.SELECT_NODE: {
      const prevState = structuredClone(state);
      const payload = structuredClone(action.payload as GraphNodeProps);
      payload.algorithmState = "selected";
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
