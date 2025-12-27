import axios from 'axios';

const API_BASE_URL = ''; // Changed to empty string to let Vite proxy handle it

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

interface NodeData {
  id: string;
  displayValue: string;
  x: number;
  y: number;
}

interface EdgeData {
  id: string;
  weight: number;
  isDirected: boolean;
  nodeAid: string;
  nodeBid: string;
}

interface SaveGraphDto {
  nodes: Record<string, NodeData>;
  edges: Record<string, EdgeData>;
}

export const saveGraph = async (
  graphData: SaveGraphDto,
  token: string,
  graphId?: string,
) => {
  setAuthToken(token); // Set the token for this request

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
