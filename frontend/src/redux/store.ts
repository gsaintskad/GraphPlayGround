import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";

import {
  graphNodesReducer,
  // highlightedGraphNodesReducer,
  selectedGraphNodesReducer,
} from "@/redux/GraphNodes/reducer";
import graphEdgesReducer from "@/redux/GraphEdges/reducer";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { stateObject } from "../lib/types";
import { GraphNodeProps } from "@/components/GraphBuilder/GraphDisplay/GraphNode";
import { GraphEdgeProps } from "@/components/GraphBuilder/GraphDisplay/GraphEdge";
import {
  GraphNodeActionTypes,
  GraphNodeAction,
} from "@/redux/GraphNodes/actionTypes";
import {
  GraphEdgesActionTypes,
  GraphEdgeAction,
} from "@/redux/GraphEdges/actionTypes";
import { DisplaySettingsAction } from "@/redux/DisplaySettings/actionTypes";
import { DisplaySettingsState } from "@/redux/DisplaySettings/reducer";
import displaySettingsReducer from "@/redux/DisplaySettings/reducer";
import animationReducer, { AnimationState } from "@/redux/Animations/reducer";
import { AnimationAction } from "@/redux/Animations/actionTypes";
import { GraphBuilderAction } from "@/redux/GraphBuilder/actionTypes";
import graphBuilderReducer, { GraphBuilderState } from "@/redux/GraphBuilder/reducer";


export type rootAction = GraphEdgeAction | GraphNodeAction | DisplaySettingsAction | AnimationAction | GraphBuilderAction;
const store: ToolkitStore<
  {
    graphNodes: stateObject<GraphNodeProps>;
    graphEdges: stateObject<GraphEdgeProps>;
    selectedGraphNodes: GraphNodeProps[];
    displaySettings: DisplaySettingsState;
    animations: AnimationState;
    graphBuilderTool: GraphBuilderState;
    // highlightedGraphNodes: string[];

  },
  rootAction,
  []
> = configureStore({
  reducer: {
    graphNodes: graphNodesReducer,
    graphEdges: graphEdgesReducer,
    selectedGraphNodes: selectedGraphNodesReducer,
    displaySettings: displaySettingsReducer,
    animations: animationReducer,
    graphBuilderTool: graphBuilderReducer,
    // highlightedGraphNodes:highlightedGraphNodesReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
