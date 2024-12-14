import { Dispatch } from 'redux';

import {discardSelection, setNodeCoordinates} from "@/redux/GraphNodes/actionCreator.ts";
import {calculateEdgeProps} from "@/redux/GraphEdges/actionCreator.ts";
import {Point} from "../../../types.ts";
import {GraphNodeProps} from "@/GraphBuilder/GraphDisplay/GraphNode/GraphNode.tsx"; // Assuming Point type is defined elsewhere

export const handleNodeMovementThunk = (nodeId: string, coordinates: Point, node:GraphNodeProps) => {
  return async (dispatch: Dispatch) => {
    // Dispatch actions in sequence
    dispatch(setNodeCoordinates(node.id, coordinates));
    dispatch(calculateEdgeProps(node));
    dispatch(discardSelection());

    // Return a resolved promise for the caller to await
    return Promise.resolve();
  };
};
