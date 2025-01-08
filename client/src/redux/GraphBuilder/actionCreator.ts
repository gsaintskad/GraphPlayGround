import {
  GraphBuilderTool,
  GraphBuilderAction
} from "./actionTypes";

export const setPointerTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.POINTER,
  payload: null,
});

export const setCreateTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.CREATE,
  payload: null,
});

export const setDirectConnectTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.DIRECT_CONNECT,
  payload: null,
});

export const setConnectTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.CONNECT,
  payload: null,
});

export const setDisconnectTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.DISCONNECT,
  payload: null,
});

export const setMoveTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.MOVE,
  payload: null,
});
export const setRemoveTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.REMOVE,
  payload: null,
});
export const setPlayAnimationTool = (): GraphBuilderAction => ({
  type: GraphBuilderTool.PLAY_ANIMATION,
  payload: null,
});
