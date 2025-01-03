import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";

import {
  graphNodesReducer,
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

export type rootAction = GraphEdgeAction | GraphNodeAction|DisplaySettingsAction;
const store: ToolkitStore<
  {
    graphNodes: stateObject<GraphNodeProps>;
    graphEdges: stateObject<GraphEdgeProps>;
    selectedGraphNodes: GraphNodeProps[];
    displaySettings:DisplaySettingsState
  },
  rootAction,
  []
> = configureStore({
  reducer: {
    graphNodes: graphNodesReducer,
    graphEdges: graphEdgesReducer,
    selectedGraphNodes: selectedGraphNodesReducer,
    displaySettings:displaySettingsReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
