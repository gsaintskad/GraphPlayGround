import { GraphNodeActionTypes } from "./actionTypes.ts";
import {GraphNodeProps, GraphNodeStates} from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { Reducer } from "@reduxjs/toolkit";
import { Point, stateObject } from "../../lib/types.ts";
import { rootAction } from "@/redux/store.ts";

const initialGraphMapState: stateObject<GraphNodeProps> = {};
const initialSelectedNodeArrState: GraphNodeProps[] = [];
const previousGraphNodeStates:stateObject<GraphNodeStates> = {};

export const graphNodesReducer: Reducer<
  stateObject<GraphNodeProps>,
  rootAction
> = (
  state = initialGraphMapState,
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
    case GraphNodeActionTypes.DISCARD_NODE_MAP: {
      return {} satisfies stateObject<string>;
    }
    case GraphNodeActionTypes.SET_NODES_IS_ACTIVE: {
      const prevState = structuredClone(state);
      for (const k in prevState) {
        prevState[k].isActive = !!action.payload;
      }
      return prevState;
    }
    case GraphNodeActionTypes.SET_NODE_NAME: {
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
    case GraphNodeActionTypes.SET_NODE_AS_PRIMARY: {
      const prevState = structuredClone(state);
      const payload = action.payload; // payload = id
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: "primary",
      };
      // store.dispatch(calculateEdgeProps(prevState[payload.id]));
      return prevState;
    }
    case GraphNodeActionTypes.SET_NODE_AS_SECONDARY: {
      const prevState = structuredClone(state);
      const payload = action.payload; // payload = id
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: "secondary",
      };
      // store.dispatch(calculateEdgeProps(prevState[payload.id]));
      return prevState;
    }
    case GraphNodeActionTypes.SET_NODE_AS_COMPARING: {
      const prevState = structuredClone(state);
      const payload = action.payload; // payload = id
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: "comparing",
      };
      // store.dispatch(calculateEdgeProps(prevState[payload.id]));
      return prevState;
    }
    case GraphNodeActionTypes.MARK_NODE_AS_VISITED: {
      const prevState = structuredClone(state);
      const payload = action.payload; // payload = id
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: "visited",
      };
      // store.dispatch(calculateEdgeProps(prevState[payload.id]));
      return prevState;
    }
    case GraphNodeActionTypes.SET_NODE_AS_SELECTED: {
      const prevState = structuredClone(state);
      const payload = action.payload; // payload = id
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: "selected",
      };

      return prevState;
    }
    case GraphNodeActionTypes.DISCARD_ALGORITHM_STATE: {
      const prevState = structuredClone(state);
      for (const id in prevState) {
        prevState[id].algorithmState = "primary";
      }

      return prevState;
    }
    case GraphNodeActionTypes.HIGHLIGHT_NODE: {
      const prevState = structuredClone(state);
      // prevState.push(action.payload);
      const payload = action.payload; // payload = id
      previousGraphNodeStates[payload]=prevState[payload].algorithmState!;
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: "highlighted",
      };
      return prevState;
    }
    case GraphNodeActionTypes.DEHIGHLIGHT_NODE: {

      const prevState = structuredClone(state);

      const payload = action.payload; // payload = id
      previousGraphNodeStates[payload]=prevState[payload].algorithmState!;
      prevState[payload] = {
        ...prevState[payload],
        algorithmState: previousGraphNodeStates[payload],
      };
      return prevState;
    }
    default:
      return state;
  }
};
export const selectedGraphNodesReducer: Reducer<
  GraphNodeProps[],
  rootAction
> = (
  state = initialSelectedNodeArrState,
  action: rootAction,
): GraphNodeProps[] => {
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
// export const highlightedGraphNodesReducer: Reducer<string[], rootAction> = (
//   state = initialHighlightedNodeArrState,
//   action: rootAction,
// ): string[] => {
//   switch (action.type) {
//     case GraphNodeActionTypes.HIGHLIGHT_NODE: {
//       const prevState = structuredClone(state);
//       prevState.push(action.payload);
//       return prevState;
//     }
//     case GraphNodeActionTypes.DEHIGHLIGHT_NODE: {
//       const prevState = structuredClone(state);
//
//       return prevState.filter((id) => id !== action.payload);
//     }
//     default:
//       return state;
//   }
// };
