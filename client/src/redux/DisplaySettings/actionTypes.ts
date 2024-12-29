import { AnyAction } from "@reduxjs/toolkit";
export type Language = "ua" | "de" | "en" | "ru" | "pl";

export enum DisplaySettingsActionTypes {
  SET_NODE_SIZE = "SET_NODE_SIZE",
  SET_NODE_COLOR = "SET_NODE_COLOR",
  SET_NODE_BORDER_COLOR = "SET_NODE_BORDER_COLOR",
  SET_NODE_FONT_COLOR = "SET_NODE_FONT_COLOR",
  SET_NODE_FONT_SIZE = "SET_NODE_FONT_SIZE",
  SET_EDGE_COLOR = "SET_EDGE_COLOR",
  SET_EDGE_BORDER_COLOR = "SET_EDGE_BORDER_COLOR",
  SET_EDGE_WIDTH = "SET_EDGE_WIDTH",
  SET_WEIGHT_COLOR = "SET_WEIGHT_COLOR",
  SET_WEIGHT_FONT_SIZE = "SET_WEIGHT_FONT_SIZE",
  SET_LANGUAGE = "SET_LANGUAGE",
}
export interface SetLanguage extends AnyAction {
  type: DisplaySettingsActionTypes.SET_LANGUAGE;
  payload: Language;
}
export interface SetNodeFontSize extends AnyAction {
  type: DisplaySettingsActionTypes.SET_NODE_FONT_SIZE;
  payload: number;
}
export interface SetNodeFontColor extends AnyAction {
  type: DisplaySettingsActionTypes.SET_NODE_FONT_COLOR;
  payload: string;
}
export interface SetNodeSizeAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_NODE_SIZE;
  payload: number; // Assuming node size is a number
}

export interface SetNodeColorAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_NODE_COLOR;
  payload: string; // Assuming color is represented as a string (e.g., hex or color name)
}

export interface SetNodeBorderColorAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_NODE_BORDER_COLOR;
  payload: string; // Assuming border color is a string
}

export interface SetEdgeColorAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_EDGE_COLOR;
  payload: string;
}

export interface SetEdgeBorderColorAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_EDGE_BORDER_COLOR;
  payload: string;
}

export interface SetEdgeWidthAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_EDGE_WIDTH;
  payload: number; // Assuming edge width is a number
}

export interface SetWeightColorAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_WEIGHT_COLOR;
  payload: string;
}

export interface SetWeightFontSizeAction extends AnyAction {
  type: DisplaySettingsActionTypes.SET_WEIGHT_FONT_SIZE;
  payload: number; // Assuming font size is a number
}

// Union type for all actions
export type DisplaySettingsAction =
  | SetLanguage
  | SetNodeFontSize
  | SetNodeFontColor
  | SetNodeSizeAction
  | SetNodeColorAction
  | SetNodeBorderColorAction
  | SetEdgeColorAction
  | SetEdgeBorderColorAction
  | SetEdgeWidthAction
  | SetWeightColorAction
  | SetWeightFontSizeAction;
