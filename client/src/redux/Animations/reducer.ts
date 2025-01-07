
import { Reducer } from "@reduxjs/toolkit";

import {AlgorithmState, AlgorithmType, AnimationActionTypes} from "@/redux/Animations/actionTypes.ts";



export interface AnimationState {
  Dijkstra: AlgorithmState;
  Astar: AlgorithmState;
  DFS: AlgorithmState;
  BFS: AlgorithmState;
  currentAlgorithm?: AlgorithmType
}

const initialState: AnimationState = {
  Dijkstra: { steps: [] },
  Astar: { steps: [] },
  DFS: { steps: [] },
  BFS: { steps: [] },
};

const animationReducer: Reducer<AnimationState> = (state = initialState, action): AnimationState => {
  switch (action.type) {
    case AnimationActionTypes.SET_DIJKSTRA:
      return {
        ...state,
        Dijkstra: { ...action.payload, currentStep:0 },
      };

    default:
      return state;
  }
};

export default animationReducer;
