import { DisplaySettingsActionTypes } from "./actionTypes.ts";
import { Reducer } from "@reduxjs/toolkit";
import { rootAction } from "@/redux/store.ts";

export interface DisplaySettingsState {
  nodeSize: number;
  nodeColor: string;
  nodeBorderColor: string;
  edgeColor: string;
  edgeBorderColor: string;
  edgeWidth: number;
  weightColor: string;
  weightFontSize: number;
}

const initialState: DisplaySettingsState = {
  nodeSize: 90,
  nodeColor: "#027502",
  nodeBorderColor: "#ffffff",
  edgeColor: "#ffffff",
  edgeBorderColor: "#a1a1a1",
  edgeWidth: 20,
  weightColor: "#ffffff",
  weightFontSize: 12,
};

const displaySettingsReducer: Reducer<DisplaySettingsState, rootAction> = (
  state = initialState,
  action: rootAction
): DisplaySettingsState => {
  switch (action.type) {
    case DisplaySettingsActionTypes.SET_NODE_SIZE: {
      return {
        ...state,
        nodeSize: action.payload as number,
      };
    }
    case DisplaySettingsActionTypes.SET_NODE_COLOR: {
      return {
        ...state,
        nodeColor: action.payload as string,
      };
    }
    case DisplaySettingsActionTypes.SET_NODE_BORDER_COLOR: {
      return {
        ...state,
        nodeBorderColor: action.payload as string,
      };
    }
    case DisplaySettingsActionTypes.SET_EDGE_COLOR: {
      return {
        ...state,
        edgeColor: action.payload as string,
      };
    }
    case DisplaySettingsActionTypes.SET_EDGE_BORDER_COLOR: {
      return {
        ...state,
        edgeBorderColor: action.payload as string,
      };
    }
    case DisplaySettingsActionTypes.SET_EDGE_WIDTH: {
      return {
        ...state,
        edgeWidth: action.payload as number,
      };
    }
    case DisplaySettingsActionTypes.SET_WEIGHT_COLOR: {
      return {
        ...state,
        weightColor: action.payload as string,
      };
    }
    case DisplaySettingsActionTypes.SET_WEIGHT_FONT_SIZE: {
      return {
        ...state,
        weightFontSize: action.payload as number,
      };
    }
    default:
      return state;
  }
};

export default displaySettingsReducer;
