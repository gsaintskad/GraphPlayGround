import axios from "axios";

// CORRECT: Relative path hits the Vite Proxy (http://localhost:5173/api)
const API_BASE_URL = "/api";

// INCORRECT: This bypasses the proxy and causes the cookie issue
// const API_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies
});

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
