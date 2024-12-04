import {configureStore, Reducer} from "@reduxjs/toolkit";

import {graphNodesReducer, selectedGraphNodesReducer} from "@/redux/GraphNodes/reducer.ts";
import graphEdgesReducer from "@/redux/GraphEdges/reducer.ts";

const store=configureStore({
    reducer:{
        graphNodes: graphNodesReducer,
        graphEdges: graphEdgesReducer,
        selectedGraphNodes:selectedGraphNodesReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;