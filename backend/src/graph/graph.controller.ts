import { Body, Controller, Post } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphInputDto } from './dto/graph.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post()
  computeGraph(@Body() graphInput: GraphInputDto) {
    switch (graphInput.algorithm) {
      case 'BFS':
        return { bfs: this.graphService.solveBFS(graphInput) };
      case 'DFS':
        return { dfs: this.graphService.solveDFS(graphInput) };
      case 'Astar':
        return { astar: this.graphService.solveAstar(graphInput) };
      case 'Dijkstra':
      default:
        return { dijkstra: this.graphService.solveDijkstra(graphInput) };
    }
  }
}
