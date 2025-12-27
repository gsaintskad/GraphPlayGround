export class NodeDto {
  id: string;
  displayValue: string;
}

export class EdgeDto {
  id: string;
  nodeAid: string;
  nodeBid: string;
  weight: number;
  isDirected: boolean;
}

export class GraphInputDto {
  nodes: Record<string, NodeDto>;
  edges: Record<string, EdgeDto>;
  startNodeId: string;
  targetNodeId?: string;
  algorithm: string;
}
