import {GraphEdgeAction, GraphEdgesActionTypes} from "./actionTypes.ts";
import {GraphEdgeProps} from "@/GraphBuilder/GraphDisplay/GraphEdge/GraphEdge.tsx";
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx";
import {rootAction} from "@/redux/store.ts";

export const addEdge = (edgeDto: GraphEdgeProps):rootAction => {
  return {
    type: GraphEdgesActionTypes.ADD_EDGE,
    payload: edgeDto,
  };
};
export const setEdgesIsActive = (isActive: boolean):rootAction => {
  return {
    type: GraphEdgesActionTypes.SET_EDGES_IS_ACTIVE,
    payload: isActive,
  };
};
export const discardEdgeMap=()=>{
  return {
    type:GraphEdgesActionTypes.DISCARD_EDGE_MAP,
    payload:null
  }
}
// export const calculateEdgeProps = (nodeDto: GraphNodeProps):rootAction => {
//   return {
//     type: GraphEdgesActionTypes.CALCULATE_PROPS,
//     payload: nodeDto,
//   };
// };
export const removeEdge = (id: string):rootAction => {
  return {
    type: GraphEdgesActionTypes.REMOVE_EDGE,
    payload: id,
  };
};
export const removeEdgesForNode = (nodeId: string):rootAction => {
  return {
    type: GraphEdgesActionTypes.REMOVE_EDGES_CONNECTING_NODE,
    payload: nodeId,
  };
};
export const setWeight=(id:string,weight:number):rootAction=>{
  return{
    type:GraphEdgesActionTypes.SET_WEIGHT,
    payload: {weight,id},
  }
}
