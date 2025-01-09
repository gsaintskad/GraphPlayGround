import {GraphNodeActionTypes, GraphNodeAlgorithmStates} from "@/redux/GraphNodes/actionTypes.ts";
export type AlgorithmType = 'Astar'|"Dijkstra"|"DFS"|"BFS"
export enum AnimationActionTypes {
  CHOOSE_CURRENT_ALGORITHM = 'CHOOSE_CURRENT_ALGORITHM',

  SET_DIJKSTRA = "SET_DIJKSTRA",
  SET_ASTAR = "SET_ASTAR",
  SET_DFS = "SET_DFS",
  SET_BFS = "SET_BFS",
  SET_STEP = "SET_STEP",
  RESET_ALGORITHM = "RESET_ALGORITHM",
}

export interface AlgorithmStep {
  type: GraphNodeActionTypes;
  payload: {
    id: string;
    algorithmState: GraphNodeAlgorithmStates;
    queueState: string[];
  };
}
export interface AlgorithmState {
  steps: AlgorithmStep[];
  output?:unknown;
}
export interface SetAlgorithmAction {
  type: AnimationActionTypes;
  payload: AlgorithmStep[];
}
export interface AnimationAction  {
  type: AnimationActionTypes;
  payload: unknown;
}
