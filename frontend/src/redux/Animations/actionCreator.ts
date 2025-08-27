import {
  AlgorithmInput,
  AlgorithmState,
  AlgorithmType,
  AnimationAction,
  AnimationActionTypes,
  AstarInput,
  AstarState,
  BFSInput,
  BFSState,
  DFSInput,
  DFSState,
  DijkstraInput,
  DijkstraState,
} from "@/redux/Animations/actionTypes";
export const chooseCurrentAlgorithm = (algorithm: AlgorithmType) => {
  return {
    type: AnimationActionTypes.CHOOSE_CURRENT_ALGORITHM,
    payload: algorithm,
  } as AnimationAction;
};
export const setAlgorithmStep = (
  algorithm: AlgorithmType,
  stepNum: number = 0,
) => {
  return {
    type: AnimationActionTypes.SET_STEP,
    payload: { algorithm, stepNum },
  } as AnimationAction;
};
export const resetAlgorithmStep = (algorithm: AlgorithmType) => {
  return {
    type: AnimationActionTypes.RESET_ALGORITHM,
    payload: { algorithm },
  } as AnimationAction;
};

export const setDijkstra = (Dijkstra: DijkstraState): AnimationAction => {
  return {
    type: AnimationActionTypes.SET_DIJKSTRA,
    payload: Dijkstra,
  } as AnimationAction;
};
export const setAstar = (Astar: AstarState): AnimationAction => {
  return {
    type: AnimationActionTypes.SET_ASTAR,
    payload: Astar,
  } as AnimationAction;
};

export const setDFS = (DFS: DFSState): AnimationAction => {
  return {
    type: AnimationActionTypes.SET_DFS,
    payload: DFS,
  } as AnimationAction;
};

export const setBFS = (BFS: BFSState): AnimationAction => {
  return {
    type: AnimationActionTypes.SET_BFS,
    payload: BFS,
  } as AnimationAction;
};
export const setAlgorithmArguments = (
  algorithm: AlgorithmType,
  argument: keyof DijkstraInput | AstarInput | DFSInput | BFSInput,
  nodeId: string,
) => {
  return {
    type: AnimationActionTypes.SET_ALGORITHM_ARGUMENTS,
    payload: { algorithm, argument, nodeId },
  };
};
