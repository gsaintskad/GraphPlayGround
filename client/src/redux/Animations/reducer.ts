import { Reducer } from "@reduxjs/toolkit";

import {
  AlgorithmState,
  AlgorithmType,
  AnimationActionTypes,
  AstarState,
  BFSState,
  DFSState,
  DijkstraState,
} from "@/redux/Animations/actionTypes.ts";

export interface AnimationState {
  Dijkstra: DijkstraState;
  Astar: AstarState;
  DFS: DFSState;
  BFS: BFSState;
  currentAlgorithm: AlgorithmType | null;
}

const initialState: AnimationState = {
  Dijkstra: { steps: [], arguments: { "Initial Node": "" } },
  Astar: { steps: [], arguments: { "Initial Node": "", "Target Node": "" } },
  DFS: { steps: [], arguments: { "Initial Node": "" } },
  BFS: { steps: [], arguments: { "Initial Node": "" } },
  currentAlgorithm: null,
};

const animationReducer: Reducer<AnimationState> = (
  state = initialState,
  action,
): AnimationState => {
  const stateCopy = structuredClone(state);
  switch (action.type) {
    case AnimationActionTypes.CHOOSE_CURRENT_ALGORITHM: {
      return {
        ...stateCopy,
        currentAlgorithm: action.payload as AlgorithmType,
      };
    }
    case AnimationActionTypes.SET_DIJKSTRA:
      return {
        ...stateCopy,
        Dijkstra: { ...action.payload },
      };
    case AnimationActionTypes.SET_ASTAR:
      return {
        ...stateCopy,
        Astar: { ...action.payload },
      };
    case AnimationActionTypes.SET_DFS:
      return {
        ...stateCopy,
        DFS: { ...action.payload },
      };
    case AnimationActionTypes.SET_BFS:
      return {
        ...stateCopy,
        BFS: { ...action.payload },
      };
    case AnimationActionTypes.SET_ALGORITHM_ARGUMENTS: {
      // @ts-ignore
      stateCopy[action.payload.algorithm].arguments[action.payload.argument] =
        action.payload.nodeId;
      return stateCopy;
    }

    default:
      return state;
  }
};

export default animationReducer;
