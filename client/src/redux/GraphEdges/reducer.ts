import * as a from './actionTypes.ts'
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import {AnyAction, Reducer} from "@reduxjs/toolkit";
import {stateObject} from "../../../types.ts";
import {GraphEdgeProps} from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";


const initialState:stateObject<GraphEdgeProps> = {}



const graphEdgesReducer:Reducer<stateObject<GraphEdgeProps>,AnyAction>=(state=initialState,action):stateObject<GraphEdgeProps>=>{
    switch(action.type){
        case a.ADD_EDGE:{
            const prevState=structuredClone(state);
            const payload=action.payload as GraphEdgeProps;
            prevState[payload.id] =payload;
            return prevState;
        }
        case a.REMOVE_EDGE: {
            const targetId  = action.payload as string;
            const prevState=structuredClone(state);
            const newState:stateObject<GraphEdgeProps> = {};
            for (const id in prevState) {
                if(id!==targetId){
                    newState[id] = prevState[id];
                }
            }
            return newState;

        }
        case a.REMOVE_EDGES_CONNECTING_NODE:{
            const targetId  = action.payload as string;
            const prevState=structuredClone(state);
            const newState:stateObject<GraphEdgeProps> = {};
            for (const id in prevState) {
                if(!(id.split('-').includes(targetId))){
                    newState[id] = prevState[id];
                }
            }
            return newState;
        }

        case a.SET_EDGES_IS_ACTIVE:{
            const prevState=structuredClone(state);
            for (const k in prevState) {
                prevState[k].isActive=!!action.payload;
            }
            return prevState;
        }
        case a.CALCULATE_PROPS:{
            const prevState=structuredClone(state);
            for (const id in prevState) {
                if(prevState[id].nodeA.id === action.payload.id){
                    prevState[id].nodeA = action.payload;
                }
                else if(prevState[id].nodeB.id === action.payload.id){
                    prevState[id].nodeB = action.payload;
                }
            }

            return prevState
        }
        default:
            return state;

    }
}
export default graphEdgesReducer;