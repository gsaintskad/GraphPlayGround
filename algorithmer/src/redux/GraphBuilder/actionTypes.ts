import { AnyAction } from "@reduxjs/toolkit";

export enum GraphBuilderTool {
  POINTER = "POINTER",
  CREATE = "CREATE",
  DIRECT_CONNECT = "DIRECT_CONNECT",
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  MOVE = "MOVE",
  PLAY_ANIMATION = "PLAY_ANIMATION",
  REMOVE = "REMOVE",
}

export interface SetRemoveToolAction extends AnyAction {
  type: GraphBuilderTool.REMOVE;
  payload: null;
}

export interface SetPointerToolAction extends AnyAction {
  type: GraphBuilderTool.POINTER;
  payload: null;
}

export interface SetCreateToolAction extends AnyAction {
  type: GraphBuilderTool.CREATE;
  payload: null;
}

export interface SetConnectToolAction extends AnyAction {
  type: GraphBuilderTool.CONNECT;
  payload: null;
}

export interface SetDirectConnectToolAction extends AnyAction {
  type: GraphBuilderTool.DIRECT_CONNECT;
  payload: null;
}

export interface SetDisconnectToolAction extends AnyAction {
  type: GraphBuilderTool.DISCONNECT;
  payload: null;
}

export interface SetMoveToolAction extends AnyAction {
  type: GraphBuilderTool.MOVE;
  payload: null;
}

export interface SetPlayAnimationToolAction extends AnyAction {
  type: GraphBuilderTool.PLAY_ANIMATION;
  payload: boolean;
}

export type GraphBuilderAction =
  | SetRemoveToolAction
  | SetDirectConnectToolAction
  | SetDisconnectToolAction
  | SetMoveToolAction
  | SetPlayAnimationToolAction
  | SetConnectToolAction
  | SetPointerToolAction
  | SetCreateToolAction;
