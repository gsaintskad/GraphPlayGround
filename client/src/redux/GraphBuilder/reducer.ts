import { GraphBuilderTool, GraphBuilderAction } from "./actionTypes";
import {rootAction} from "@/redux/store.ts";

export interface GraphBuilderState {
  currentTool: GraphBuilderTool;
}

const initialState: GraphBuilderState = {
  currentTool: GraphBuilderTool.POINTER, // Default tool
};

export const graphBuilderReducer = (
  state: GraphBuilderState = initialState,
  action: GraphBuilderAction|rootAction
): GraphBuilderState => {
  switch (action.type) {
    case GraphBuilderTool.POINTER:
    case GraphBuilderTool.CREATE:
    case GraphBuilderTool.DIRECT_CONNECT:
    case GraphBuilderTool.CONNECT:
    case GraphBuilderTool.DISCONNECT:
    case GraphBuilderTool.MOVE:
    case GraphBuilderTool.REMOVE:
    case GraphBuilderTool.PLAY_ANIMATION:
      return {
        ...state,
        currentTool: action.type,
      };
    default:
      return state;
  }
};
