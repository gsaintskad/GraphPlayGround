
import {Reducer} from "@reduxjs/toolkit";

import {rootAction} from "@/redux/store.ts";
import {GraphBuilderTool} from "@/redux/GraphBuilder/actionTypes.ts";
import {stateObject} from "@/lib/types.ts";
import {GraphEdgeProps} from "@/components/GraphBuilder/GraphDisplay/GraphEdge.tsx";
import {GraphEdgesActionTypes} from "@/redux/GraphEdges/actionTypes.ts";

export interface GraphBuilderState {
  currentTool: GraphBuilderTool;
}

 const initialState: GraphBuilderState = {
  currentTool: GraphBuilderTool.POINTER, // Default tool
};
const graphBuilderReducer: Reducer<
  GraphBuilderState,
  rootAction
> = (state = initialState, action:rootAction): GraphBuilderState => {
  console.log(action.type.toString())
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
export default graphBuilderReducer;
