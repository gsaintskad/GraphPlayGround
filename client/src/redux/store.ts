import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";

import {
  graphNodesReducer, highlightedGraphNodesReducer,
  selectedGraphNodesReducer,
} from "@/redux/GraphNodes/reducer.ts";
import graphEdgesReducer from "@/redux/GraphEdges/reducer.ts";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { stateObject } from "../lib/types.ts";
import { GraphNodeProps } from "@/components/GraphBuilder/GraphDisplay/GraphNode.tsx";
import { GraphEdgeProps } from "@/components/GraphBuilder/GraphDisplay/GraphEdge.tsx";
import {
  GraphNodeActionTypes,
  GraphNodeAction,
} from "@/redux/GraphNodes/actionTypes.ts";
import {
  GraphEdgesActionTypes,
  GraphEdgeAction,
} from "@/redux/GraphEdges/actionTypes.ts";
import {DisplaySettingsAction} from "@/redux/DisplaySettings/actionTypes.ts";
import {DisplaySettingsState} from "@/redux/DisplaySettings/reducer.ts";
import displaySettingsReducer from "@/redux/DisplaySettings/reducer.ts";
import animationReducer, {AnimationState} from "@/redux/Animations/reducer.ts";
import {AnimationAction} from "@/redux/Animations/actionTypes.ts";
import {GraphBuilderAction} from "@/redux/GraphBuilder/actionTypes.ts";
import graphBuilderReducer, {GraphBuilderState} from "@/redux/GraphBuilder/reducer.ts";


export type rootAction = GraphEdgeAction | GraphNodeAction|DisplaySettingsAction|AnimationAction|GraphBuilderAction;
const store: ToolkitStore<
  {
    graphNodes: stateObject<GraphNodeProps>;
    graphEdges: stateObject<GraphEdgeProps>;
    selectedGraphNodes: GraphNodeProps[];
    displaySettings:DisplaySettingsState;
    animations:AnimationState;
    graphBuilderTool:GraphBuilderState;
    highlightedGraphNodes: string[];

  },
  rootAction,
  []
> = configureStore({
  reducer: {
    graphNodes: graphNodesReducer,
    graphEdges: graphEdgesReducer,
    selectedGraphNodes: selectedGraphNodesReducer,
    displaySettings:displaySettingsReducer,
    animations:animationReducer,
    graphBuilderTool:graphBuilderReducer,
    highlightedGraphNodes:highlightedGraphNodesReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
