import { configureStore } from "@reduxjs/toolkit";
import {
  graphNodesReducer,
  selectedGraphNodesReducer,
} from "@/redux/GraphNodes/reducer";
import graphEdgesReducer from "@/redux/GraphEdges/reducer";
import displaySettingsReducer from "@/redux/DisplaySettings/reducer";
import animationReducer from "@/redux/Animations/reducer";
import graphBuilderReducer from "@/redux/GraphBuilder/reducer";

// This function creates and returns a new Redux store
export const makeStore = () => {
  return configureStore({
    reducer: {
      graphNodes: graphNodesReducer,
      graphEdges: graphEdgesReducer,
      selectedGraphNodes: selectedGraphNodesReducer,
      displaySettings: displaySettingsReducer,
      animations: animationReducer,
      graphBuilderTool: graphBuilderReducer,
    },
  });
};

// Infer the type of the store returned by makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];