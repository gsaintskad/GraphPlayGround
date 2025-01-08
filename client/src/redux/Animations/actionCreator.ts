import {AlgorithmState, AlgorithmType, AnimationAction, AnimationActionTypes} from "@/redux/Animations/actionTypes.ts";
export const chooseCurrentAlgorithm=(algorithm: AlgorithmType) => {
  return {
    type: AnimationActionTypes.CHOOSE_CURRENT_ALGORITHM,
    payload: algorithm,
  }
}
export const setAlgorithmStep = (algorithm:AlgorithmType,stepNum:number=0) => {
  return{
    type:AnimationActionTypes.SET_STEP,
    payload: {algorithm, stepNum}
  }as AnimationAction
}
export const resetAlgorithmStep = (algorithm:AlgorithmType) => {
  return{
    type:AnimationActionTypes.RESET_ALGORITHM,
    payload: {algorithm}
  }as AnimationAction
}

export const setDijkstra=(Dijkstra:AlgorithmState):AnimationAction=>{
  return {
    type:AnimationActionTypes.SET_DIJKSTRA,
    payload:Dijkstra
  } as AnimationAction;
}
export const setAstar=(Astar:AlgorithmState):AnimationAction=>{
  return {
    type:AnimationActionTypes.SET_ASTAR,
    payload:Astar
  } as AnimationAction;
}

export const setDFS=(DFS:AlgorithmState):AnimationAction=>{
  return {
    type:AnimationActionTypes.SET_DFS,
    payload:DFS
  } as AnimationAction;
}

export const setBFS=(BFS:AlgorithmState):AnimationAction=>{
  return {
    type:AnimationActionTypes.SET_BFS,
    payload:BFS
  } as AnimationAction;
}

