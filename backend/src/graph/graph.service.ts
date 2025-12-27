import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveGraphDto } from './dto/save-graph.dto';
import { ComputeAlgorithmDto } from './dto/compute-algorithm.dto';

// This interface is used by the algorithm logic and expects string IDs
export interface AlgorithmStep {
  type: string;
  payload: {
    id: string;
    algorithmState: string;
    queueState: { id: string; dist: number }[];
  };
}

// This interface is also used by the algorithm logic and expects string IDs
export interface GraphData {
  nodes: Record<string, { id: string; displayValue: string; x: number; y: number }>;
  edges: Record<string, { id: string; weight: number; isDirected: boolean; nodeAid: string; nodeBid: string }>;
  startNodeId: string;
  targetNodeId?: string;
}

@Injectable()
export class GraphService {
  constructor(private readonly prisma: PrismaService) {}

  async saveGraph(saveGraphDto: SaveGraphDto, graphIdToUpdate?: string) {
    const { nodes: nodesDto, edges: edgesDto } = saveGraphDto;

    return this.prisma.$transaction(async (tx) => {
      let graph: { id: number };

      if (graphIdToUpdate) {
        const graphIdInt = parseInt(graphIdToUpdate, 10);
        // Clear existing nodes and edges for the graph
        await tx.edge.deleteMany({ where: { graphId: graphIdInt } });
        await tx.node.deleteMany({ where: { graphId: graphIdInt } });
        graph = { id: graphIdInt };
      } else {
        graph = await tx.graph.create({ data: {} });
      }

      const nodeIdMap = new Map<string, number>();

      for (const nodeIdStr in nodesDto) {
        const nodeDto = nodesDto[nodeIdStr];
        const createdNode = await tx.node.create({
          data: {
            originalId: nodeDto.id,
            displayValue: nodeDto.displayValue,
            x: nodeDto.x,
            y: nodeDto.y,
            graphId: graph.id,
          },
        });
        nodeIdMap.set(nodeDto.id, createdNode.id);
      }

      for (const edgeIdStr in edgesDto) {
        const edgeDto = edgesDto[edgeIdStr];
        const sourceNodeId = nodeIdMap.get(edgeDto.nodeAid);
        const targetNodeId = nodeIdMap.get(edgeDto.nodeBid);

        if (!sourceNodeId || !targetNodeId) {
          throw new Error('Could not find mapping for an edge node.');
        }

        await tx.edge.create({
          data: {
            originalId: edgeDto.id,
            weight: edgeDto.weight,
            isDirected: edgeDto.isDirected,
            graphId: graph.id,
            sourceNodeId: sourceNodeId,
            targetNodeId: targetNodeId,
          },
        });
      }

      return { id: graph.id.toString() };
    });
  }

  async getGraph(id: string): Promise<GraphData> {
    const graphIdInt = parseInt(id, 10);
    if (isNaN(graphIdInt)) {
      throw new NotFoundException(`Invalid Graph ID format: ${id}`);
    }

    const graph = await this.prisma.graph.findUnique({
      where: { id: graphIdInt },
      include: {
        nodes: true,
        edges: true,
      },
    });

    if (!graph) {
      throw new NotFoundException(`Graph with ID ${id} not found`);
    }

    const nodes: GraphData['nodes'] = {};
    for (const node of graph.nodes) {
      nodes[node.originalId] = {
        id: node.originalId,
        displayValue: node.displayValue,
        x: node.x,
        y: node.y,
      };
    }

    const edges: GraphData['edges'] = {};
    for (const edge of graph.edges) {
      const sourceNode = graph.nodes.find(n => n.id === edge.sourceNodeId);
      const targetNode = graph.nodes.find(n => n.id === edge.targetNodeId);
      if (sourceNode && targetNode) {
        edges[edge.originalId] = {
          id: edge.originalId,
          weight: edge.weight,
          isDirected: edge.isDirected,
          nodeAid: sourceNode.originalId,
          nodeBid: targetNode.originalId,
        };
      }
    }

    return { nodes, edges, startNodeId: '', targetNodeId: '' };
  }

  async computeAlgorithm(
    graphId: string,
    computeDto: ComputeAlgorithmDto,
  ): Promise<any> {
    const graphData = await this.getGraph(graphId);
    graphData.startNodeId = computeDto.startNodeId;
    graphData.targetNodeId = computeDto.targetNodeId;

    switch (computeDto.algorithm) {
      case 'BFS':
        return { bfs: this.solveBFS(graphData) };
      case 'DFS':
        return { dfs: this.solveDFS(graphData) };
      case 'Astar':
        return { astar: this.solveAstar(graphData) };
      case 'Dijkstra':
      default:
        return { dijkstra: this.solveDijkstra(graphData) };
    }
  }

  // --- Algorithm implementations are now compatible with GraphData using string IDs ---

  solveDijkstra(graph: GraphData) {
    const { nodes, edges, startNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const distances: Record<string, number> = {};
    const visited = new Set<string>();
    const pq: { id: string; dist: number }[] = [];

    const adj: Record<string, any[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    Object.keys(nodes).forEach((nodeId) => {
      distances[nodeId] = Infinity;
    });
    if (startNodeId) {
      distances[startNodeId] = 0;
      pq.push({ id: startNodeId, dist: 0 });
      steps.push({
        type: 'init',
        payload: { id: startNodeId, algorithmState: 'highlighted', queueState: [...pq] },
      });
    }

    while (pq.length > 0) {
      pq.sort((a, b) => b.dist - a.dist);
      const { id: u, dist: uDist } = pq.pop()!;

      if (visited.has(u)) continue;
      visited.add(u);

      steps.push({
        type: 'visit',
        payload: { id: u, algorithmState: 'visited', queueState: [...pq] },
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
            payload: { id: v, algorithmState: 'highlighted', queueState: [...pq] },
          });
        }
      }
    }
    return { steps, output: distances };
  }

  solveBFS(graph: GraphData) {
    const { nodes, edges, startNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];

    const adj: Record<string, any[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });
    
    if (startNodeId) {
      visited.add(startNodeId);
      queue.push(startNodeId);
      steps.push({
        type: 'init',
        payload: { id: startNodeId, algorithmState: 'highlighted', queueState: queue.map(id => ({id, dist: 0})) },
      });
    }

    while (queue.length > 0) {
      const u = queue.shift()!;
      steps.push({
        type: 'visit',
        payload: { id: u, algorithmState: 'visited', queueState: queue.map(id => ({id, dist: 0})) },
      });

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        const v = edge.nodeAid === u ? edge.nodeBid : edge.nodeAid;
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
          steps.push({
            type: 'update',
            payload: { id: v, algorithmState: 'highlighted', queueState: queue.map(id => ({id, dist: 0})) },
          });
        }
      }
    }
    return { steps, output: {} };
  }

  solveDFS(graph: GraphData) {
    const { nodes, edges, startNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const visited = new Set<string>();
    const stack: string[] = [];

    const adj: Record<string, any[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    if (startNodeId) {
      stack.push(startNodeId);
      steps.push({
        type: 'init',
        payload: { id: startNodeId, algorithmState: 'highlighted', queueState: stack.map(id => ({id, dist: 0})) },
      });
    }
    
    while (stack.length > 0) {
      const u = stack.pop()!;
      if (visited.has(u)) continue;
      visited.add(u);

      steps.push({
        type: 'visit',
        payload: { id: u, algorithmState: 'visited', queueState: stack.map(id => ({id, dist: 0})) },
      });

      const neighbors = adj[u] || [];
      for (const edge of neighbors) {
        const v = edge.nodeAid === u ? edge.nodeBid : edge.nodeAid;
        if (!visited.has(v)) {
          stack.push(v);
          steps.push({
            type: 'update',
            payload: { id: v, algorithmState: 'highlighted', queueState: stack.map(id => ({id, dist: 0})) },
          });
        }
      }
    }
    return { steps, output: {} };
  }

  solveAstar(graph: GraphData) {
    const { nodes, edges, startNodeId, targetNodeId } = graph;
    const steps: AlgorithmStep[] = [];
    const gScore: Record<string, number> = {};
    const visited = new Set<string>();
    const pq: { id: string; dist: number }[] = [];

    const adj: Record<string, any[]> = {};
    Object.keys(nodes).forEach((id) => (adj[id] = []));
    Object.values(edges).forEach((edge) => {
      if (adj[edge.nodeAid]) adj[edge.nodeAid].push(edge);
      if (!edge.isDirected && adj[edge.nodeBid]) {
        adj[edge.nodeBid].push(edge);
      }
    });

    Object.keys(nodes).forEach((nodeId) => {
      gScore[nodeId] = Infinity;
    });

    if (startNodeId) {
      gScore[startNodeId] = 0;
      pq.push({ id: startNodeId, dist: 0 });
      steps.push({
        type: 'init',
        payload: { id: startNodeId, algorithmState: 'highlighted', queueState: [...pq] },
      });
    }

    while (pq.length > 0) {
      pq.sort((a, b) => b.dist - a.dist);
      const { id: u } = pq.pop()!;

      if (targetNodeId && u === targetNodeId) {
        steps.push({
          type: 'visit',
          payload: { id: u, algorithmState: 'visited', queueState: [...pq] },
        });
        break;
      }
      if (visited.has(u)) continue;
      visited.add(u);

      steps.push({
        type: 'visit',
        payload: { id: u, algorithmState: 'visited', queueState: [...pq] },
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
            payload: { id: v, algorithmState: 'highlighted', queueState: [...pq] },
          });
        }
      }
    }
    return { steps, output: gScore };
  }
}
