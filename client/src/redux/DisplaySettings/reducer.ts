import {DisplaySettingsActionTypes, Language} from "./actionTypes.ts";
import {Reducer} from "@reduxjs/toolkit";
import {rootAction} from "@/redux/store.ts";

export interface DisplaySettingsState {
  nodeSize: number;
  nodeColors: {
    primary:string;
    secondary:string;
    selected:string;
    comparing:string;
    visited:string;
  }
  nodeBorderColor: string;
  edgeColor: string;
  edgeBorderColor: string;
  edgeWidth: number;
  weightColor: string;
  weightFontSize: number;
  nodeFontColor: string;
  nodeFontSize: number;
  language:Language;
  animationSpeed: number;
}

const initialState: DisplaySettingsState = {
  nodeSize: 90,
  nodeColors: {
    primary:"#219421",
    secondary:"#dfcc00",
    selected:"#00b4df",
    comparing:"#de0000",
    visited:"#546367",
  },
  nodeBorderColor: "#ffffff",
  edgeColor: "#ffffff",
  edgeBorderColor: "#a1a1a1",
  edgeWidth: 20,
  weightColor: "#ffffff",
  weightFontSize: 20,
  nodeFontColor:"#ffffff",
  nodeFontSize: 20,
  language:'en',
  animationSpeed:500,
};

const displaySettingsReducer: Reducer<DisplaySettingsState, rootAction> = (
  state = initialState,
  action: rootAction
): DisplaySettingsState => {
  switch (action.type) {
    case DisplaySettingsActionTypes.SET_ANIMATION_SPEED:{
      return {
        ...state,
        animationSpeed:action.payload
      }
    }
    case DisplaySettingsActionTypes.SET_NODE_FONT_COLOR:{
      return {
        ...state,
        nodeFontColor: action.payload,
      }
    }
    case DisplaySettingsActionTypes.SET_LANGUAGE:{
      return{
        ...state,
        language:(action.payload as Language),
      }
    }
    case DisplaySettingsActionTypes.SET_NODE_FONT_SIZE:{
      return {
        ...state,
        nodeFontSize: action.payload,
      }
    }
    case DisplaySettingsActionTypes.SET_NODE_SIZE: {
      return {
        ...state,
        nodeSize: action.payload as number,
      };
    }
    case DisplaySettingsActionTypes.SET_NODE_COLORS: {
      return {
        ...state,
        nodeColors: action.payload ,
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
