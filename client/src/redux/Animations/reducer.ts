import { Reducer } from "@reduxjs/toolkit";

import {
  AlgorithmState,
  AlgorithmType,
  AnimationActionTypes,
} from "@/redux/Animations/actionTypes.ts";

export interface AnimationState {
  Dijkstra: AlgorithmState;
  Astar: AlgorithmState;
  DFS: AlgorithmState;
  BFS: AlgorithmState;
}

const initialState: AnimationState = {
  Dijkstra: { steps: [], arguments: { "Inittial Node": null } },
  Astar: { steps: [], arguments: { "Inittial Node": null } },
  DFS: { steps: [], arguments: { "Inittial Node": null } },
  BFS: { steps: [], arguments: { "Inittial Node": null } },
};

const animationReducer: Reducer<AnimationState> = (
  state = initialState,
  action,
): AnimationState => {
  switch (action.type) {
    case AnimationActionTypes.SET_DIJKSTRA:
      return {
        ...state,
        Dijkstra: { ...action.payload, currentStep: 0 },
      };

    default:
      return state;
  }
};

export default animationReducer;
