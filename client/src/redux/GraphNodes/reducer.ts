import * as a from './actionTypes.ts'
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import {AnyAction, Reducer} from "@reduxjs/toolkit";
import {stateObject} from "../../../types.ts";


const initialState:stateObject<GraphNodeProps> = {}
const selectedState:GraphNodeProps[] =[]



export const graphNodesReducer:Reducer<stateObject<GraphNodeProps>,AnyAction>=(state=initialState,action):stateObject<GraphNodeProps>=>{
    switch(action.type){
        case a.ADD_NODE:{
            const prevState=structuredClone(state);
            const payload=action.payload as GraphNodeProps;
            prevState[payload.id] =payload;
            return prevState;
        }
        case a.SET_NODES_IS_ACTIVE:{
            const prevState=structuredClone(state);
            for (const k in prevState) {
                prevState[k].isActive=!!action.payload;
            }
            return prevState;
        }

        default:
            return state;

    }
}
export const selectedGraphNodesReducer:Reducer<GraphNodeProps[],AnyAction>=(state=selectedState,action):GraphNodeProps[]=>{
    switch(action.type){
        case a.SELECT_NODE:{
            const prevState=structuredClone(state);
            prevState.push(action.payload);
            return prevState;

        }
        case a.DISCARD_SELECTION:{
            return [] as GraphNodeProps[];
        }
        default:
            return state;
    }
}
