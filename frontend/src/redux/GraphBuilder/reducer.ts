import { Reducer } from "@reduxjs/toolkit";

import { rootAction } from "@/redux/store";
import { GraphBuilderTool } from "@/redux/GraphBuilder/actionTypes";

export interface GraphBuilderState {
  currentTool: GraphBuilderTool;
}

const initialState: GraphBuilderState = {
  currentTool: GraphBuilderTool.POINTER, // Default tool
};
const graphBuilderReducer: Reducer<
  GraphBuilderState,
  rootAction
> = (state = initialState, action: rootAction): GraphBuilderState => {

  switch (action.type) {
    case GraphBuilderTool.POINTER:
    case GraphBuilderTool.CREATE:
    case GraphBuilderTool.DIRECT_CONNECT:
    case GraphBuilderTool.CONNECT:
    case GraphBuilderTool.DISCONNECT:
    case GraphBuilderTool.MOVE:
    case GraphBuilderTool.REMOVE:
      return {
        ...state,
        currentTool: action.type,
      };
    case GraphBuilderTool.PLAY_ANIMATION:
      return {
        ...state,
        currentTool: action.payload ? action.type : GraphBuilderTool.POINTER
      }
    default:
      return state;
  }
};
export default graphBuilderReducer;
