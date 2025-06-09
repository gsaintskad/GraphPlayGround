import { configureStore } from "@reduxjs/toolkit";
import graphEdgesReducer from "./GraphEdges/reducer";
import graphNodesReducer from "./GraphNodes/reducer";
import selectedGraphNodesReducer from "./GraphNodes/reducer";
import displaySettingsReducer from "./DisplaySettings/reducer";
import animationReducer from "./Animations/reducer";
import graphBuilderReducer from "./GraphBuilder/reducer";

export const store = configureStore({
  reducer: {
    graphNodes: graphNodesReducer,
    graphEdges: graphEdgesReducer,
    selectedGraphNodes: selectedGraphNodesReducer,
    displaySettings: displaySettingsReducer,
    animations: animationReducer,
    graphBuilderTool: graphBuilderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
