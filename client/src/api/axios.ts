import axios from "axios";

// Ensure this points to your proxy path
const API_BASE_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important: This ensures cookies are sent with requests
});

// We no longer need the interceptor to manually attach the token

export interface NodeData {
  id: string;
  displayValue: string;
  x: number;
  y: number;
}

export interface EdgeData {
  id: string;
  weight: number;
  isDirected: boolean;
  nodeAid: string;
  nodeBid: string;
}

export interface SaveGraphDto {
  nodes: Record<string, NodeData>;
  edges: Record<string, EdgeData>;
}

export const saveGraph = async (graphData: SaveGraphDto, graphId?: string) => {
  const url = graphId ? `/graph/${graphId}` : "/graph";
  const method = graphId ? "PUT" : "POST";

  const response = await axiosInstance({
    url,
    method,
    data: graphData,
  });

  return response.data;
};

export default axiosInstance;
