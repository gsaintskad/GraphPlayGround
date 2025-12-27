import {
  GraphNodeActionTypes,
  GraphNodeAlgorithmStates,
} from "@/redux/GraphNodes/actionTypes.ts";
export type AlgorithmType = "Astar" | "Dijkstra" | "DFS" | "BFS";
export enum AnimationActionTypes {
  CHOOSE_CURRENT_ALGORITHM = "CHOOSE_CURRENT_ALGORITHM",
  SET_DIJKSTRA = "SET_DIJKSTRA",
  SET_ASTAR = "SET_ASTAR",
  SET_DFS = "SET_DFS",
  SET_BFS = "SET_BFS",
  SET_STEP = "SET_STEP",
  RESET_ALGORITHM = "RESET_ALGORITHM",
  SET_ALGORITHM_ARGUMENTS = "SET_ALGORITHM_ARGUMENTS",
}

export interface AlgorithmStep {
  type: GraphNodeActionTypes;
  payload: {
    id: string;
    algorithmState: GraphNodeAlgorithmStates;
    queueState: string[];
  };
}
export interface AlgorithmInput {
  [key: string]: string;
}
export interface AlgorithmState {
  steps: AlgorithmStep[];
  arguments: AlgorithmInput;
  output?: unknown;
}
export interface DijkstraInput extends AlgorithmInput {
  "Initial Node": string;
}
export interface AstarInput extends AlgorithmInput {
  "Initial Node": string;
  "Target Node": string;
}

export interface DFSInput extends AlgorithmInput {
  "Initial Node": string;
}

export interface BFSInput extends AlgorithmInput {
  "Initial Node": string;
}
export interface SetAlgorithmAction {
  type: AnimationActionTypes;
  payload: AlgorithmStep[];
  output?: unknown;
}
export interface AnimationAction {
  type: AnimationActionTypes;
  payload: unknown;
}
export interface DijkstraState extends AlgorithmState {
  steps: AlgorithmStep[];
  arguments: DijkstraInput;
  output?: unknown;
}
export interface DFSState extends AlgorithmState {
  steps: AlgorithmStep[];
  arguments: DFSInput;
  output?: unknown;
}
export interface BFSState extends AlgorithmState {
  steps: AlgorithmStep[];
  arguments: BFSInput;
  output?: unknown;
}
export interface AstarState extends AlgorithmState {
  steps: AlgorithmStep[];
  arguments: AstarInput;
  output?: unknown;
}
