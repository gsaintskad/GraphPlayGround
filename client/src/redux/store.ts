import {configureStore, Reducer} from "@reduxjs/toolkit";

import graphNodesReducer from "@/redux/GraphNodes/reducer.ts";
import graphEdgesReducer from "@/redux/GraphEdges/reducer.ts";

const store=configureStore({
    reducer:{
        graphNodes: graphNodesReducer,
        graphEdges: graphEdgesReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;