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

  solveBFS(graph: GraphInputDto) {
    const { nodes, edges, startNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];

    const adj: Record<string, EdgeDto[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    visited.add(startNodeId);
    queue.push(startNodeId);

    steps.push({
      type: 'init',
      payload: {
        id: startNodeId,
        algorithmState: 'highlighted',
        queueState: queue.map((id) => ({ id, dist: 0 })),
      },
    });

    while (queue.length > 0) {
      const u = queue.shift()!;

      steps.push({
        type: 'visit',
        payload: {
          id: u,
          algorithmState: 'visited',
          queueState: queue.map((id) => ({ id, dist: 0 })),
        },
      });

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        const v = edge.nodeAid === u ? edge.nodeBid : edge.nodeAid;
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);

          steps.push({
            type: 'update',
            payload: {
              id: v,
              algorithmState: 'highlighted',
              queueState: queue.map((id) => ({ id, dist: 0 })),
            },
          });
        }
      }
    }

    return { steps, output: {} };
  }

  solveDFS(graph: GraphInputDto) {
    const { nodes, edges, startNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const visited = new Set<string>();
    const stack: string[] = [];

    const adj: Record<string, EdgeDto[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    stack.push(startNodeId);

    steps.push({
      type: 'init',
      payload: {
        id: startNodeId,
        algorithmState: 'highlighted',
        queueState: stack.map((id) => ({ id, dist: 0 })),
      },
    });

    while (stack.length > 0) {
      const u = stack.pop()!;

      if (visited.has(u)) continue;
      visited.add(u);

      steps.push({
        type: 'visit',
        payload: {
          id: u,
          algorithmState: 'visited',
          queueState: stack.map((id) => ({ id, dist: 0 })),
        },
      });

      const neighbors = adj[u] || [];
      // Reverse to process in expected order for DFS if desired, or keep as is
      for (const edge of neighbors) {
        const v = edge.nodeAid === u ? edge.nodeBid : edge.nodeAid;
        if (!visited.has(v)) {
          stack.push(v);
          steps.push({
            type: 'update',
            payload: {
              id: v,
              algorithmState: 'highlighted',
              queueState: stack.map((id) => ({ id, dist: 0 })),
            },
          });
        }
      }
    }

    return { steps, output: {} };
  }

  solveAstar(graph: GraphInputDto) {
    const { nodes, edges, startNodeId, targetNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const gScore: Record<string, number> = {};
    const visited = new Set<string>();
    const pq: { id: string; dist: number }[] = [];

    // Preprocess edges into adjacency list
    const adj: Record<string, EdgeDto[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    // Initialize gScore
    Object.keys(nodes).forEach((nodeId) => {
      gScore[nodeId] = Infinity;
    });
    gScore[startNodeId] = 0;

    // PQ stores fScore (g + h). Since h=0 without coordinates, fScore = gScore.
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
      pq.sort((a, b) => b.dist - a.dist);
      const { id: u } = pq.pop()!;

      // Early exit if target is reached
      if (targetNodeId && u === targetNodeId) {
        steps.push({
          type: 'visit',
          payload: {
            id: u,
            algorithmState: 'visited',
            queueState: [...pq],
          },
        });
        break;
      }

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

        const tentative_g = gScore[u] + edge.weight;
        if (tentative_g < gScore[v]) {
          gScore[v] = tentative_g;
          pq.push({ id: v, dist: tentative_g });

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

    return { steps, output: gScore };
  }
}
