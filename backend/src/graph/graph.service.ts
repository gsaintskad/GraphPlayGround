import { Injectable } from '@nestjs/common';
import { GraphInputDto, EdgeDto } from './dto/graph.dto';

export interface AlgorithmStep {
  type: string;
  payload: {
    id: string;
    algorithmState: string;
    queueState: { id: string; dist: number }[];
  };
}

@Injectable()
export class GraphService {
  solveDijkstra(graph: GraphInputDto) {
    const { nodes, edges, startNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const distances: Record<string, number> = {};
    const visited = new Set<string>();
    const pq: { id: string; dist: number }[] = [];

    // Preprocess edges into adjacency list for efficiency
    const adj: Record<string, EdgeDto[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    // Initialize distances
    Object.keys(nodes).forEach((nodeId) => {
      distances[nodeId] = Infinity;
    });
    distances[startNodeId] = 0;
    pq.push({ id: startNodeId, dist: 0 });

    steps.push({
      type: 'init',
      payload: {
        id: startNodeId,
        algorithmState: 'highlighted',
        queueState: [...pq],
      },
    });

    while (pq.length > 0) {
      // Sort descending to pop the smallest distance (min-priority queue simulation)
      pq.sort((a, b) => b.dist - a.dist);
      const { id: u, dist: uDist } = pq.pop()!;

      if (visited.has(u)) continue;
      visited.add(u);

      steps.push({
        type: 'visit',
        payload: {
          id: u,
          algorithmState: 'visited',
          queueState: [...pq],
        },
      });

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        const v = edge.nodeAid === u ? edge.nodeBid : edge.nodeAid;
        if (visited.has(v)) continue;

        const alt = uDist + edge.weight;
        if (alt < distances[v]) {
          distances[v] = alt;
          pq.push({ id: v, dist: alt });

          steps.push({
            type: 'update',
            payload: {
              id: v,
              algorithmState: 'highlighted',
              queueState: [...pq],
            },
          });
        }
      }
    }

    return {
      steps,
      output: distances,
    };
  }
}
