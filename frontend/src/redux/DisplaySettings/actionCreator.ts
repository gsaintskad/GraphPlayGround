import {
  DisplaySettingsAction,
  DisplaySettingsActionTypes,
  Language,
} from "@/redux/DisplaySettings/actionTypes";
import { rootAction } from "@/redux/store";
// Action creators for DisplaySettings
export const setNodeSize = (size: number): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_NODE_SIZE,
    payload: size,
  } as DisplaySettingsAction;
};
export const setLanguage = (language: Language) => {
  return {
    type: DisplaySettingsActionTypes.SET_LANGUAGE,
    payload: language,
  } as DisplaySettingsAction;
};
export const setAnimationSpeed = (speed: number) => {
  return {
    type: DisplaySettingsActionTypes.SET_ANIMATION_SPEED,
    payload: speed,
  } as DisplaySettingsAction;
};
export const setNodeColors = (colors: {
  primary: string;
  secondary: string;
  selected: string;
  comparing: string;
  visited: string;
  highlighted: string;
}): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_NODE_COLORS,
    payload: colors,
  } as DisplaySettingsAction;
};
export const setNodeFontColor = (color: string) => {
  return {
    type: DisplaySettingsActionTypes.SET_NODE_FONT_COLOR,
    payload: color,
  } as DisplaySettingsAction;
};
export const setNodeFontSize = (textSize: number) => {
  return {
    type: DisplaySettingsActionTypes.SET_NODE_FONT_SIZE,
    payload: textSize,
  } as DisplaySettingsAction;
};
export const setNodeBorderColor = (color: string): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_NODE_BORDER_COLOR,
    payload: color,
  } as DisplaySettingsAction;
};

export const setEdgeColor = (color: string): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_EDGE_COLOR,
    payload: color,
  } as DisplaySettingsAction;
};

export const setEdgeBorderColor = (color: string): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_EDGE_BORDER_COLOR,
    payload: color,
  } as DisplaySettingsAction;
};

export const setEdgeWidth = (width: number): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_EDGE_WIDTH,
    payload: width,
  } as DisplaySettingsAction;
};

export const setWeightColor = (color: string): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_WEIGHT_COLOR,
    payload: color,
  } as DisplaySettingsAction;
};

export const setWeightFontSize = (fontSize: number): rootAction => {
  return {
    type: DisplaySettingsActionTypes.SET_WEIGHT_FONT_SIZE,
    payload: fontSize,
  } as DisplaySettingsAction;
};
