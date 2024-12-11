import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";

import {
  graphNodesReducer,
  selectedGraphNodesReducer,
} from "@/redux/GraphNodes/reducer.ts";
import graphEdgesReducer from "@/redux/GraphEdges/reducer.ts";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { stateObject } from "../../types.ts";
import { GraphNodeProps } from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import { GraphEdgeProps } from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import {
  GraphNodeActionTypes,
  GraphNodeAction,
} from "@/redux/GraphNodes/actionTypes.ts";
import {
  GraphEdgesActionTypes,
  GraphEdgeAction,
} from "@/redux/GraphEdges/actionTypes.ts";

export type rootAction = GraphEdgeAction | GraphNodeAction;
const store: ToolkitStore<
  {
    graphNodes: stateObject<GraphNodeProps>;
    graphEdges: stateObject<GraphEdgeProps>;
    selectedGraphNodes: GraphNodeProps[];
  },
  rootAction,
  []
> = configureStore({
  reducer: {
    graphNodes: graphNodesReducer,
    graphEdges: graphEdgesReducer,
    selectedGraphNodes: selectedGraphNodesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
