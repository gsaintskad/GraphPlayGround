import { Body, Controller, Post, Param, Put, Get } from '@nestjs/common';
import { GraphService } from './graph.service';
import { SaveGraphDto } from './dto/save-graph.dto';
import { ComputeAlgorithmDto } from './dto/compute-algorithm.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post()
  saveGraph(@Body() saveGraphDto: SaveGraphDto) {
    return this.graphService.saveGraph(saveGraphDto);
  }

  @Get(':id')
  getGraph(@Param('id') id: string) {
    return this.graphService.getGraph(id);
  }

  @Put(':id')
  updateGraph(
    @Param('id') id: string,
    @Body() saveGraphDto: SaveGraphDto,
  ) {
    return this.graphService.saveGraph(saveGraphDto, id);
  }

  @Post(':id/compute')
  computeAlgorithm(
    @Param('id') id: string,
    @Body() computeDto: ComputeAlgorithmDto,
  ) {
    return this.graphService.computeAlgorithm(id, computeDto);
  }
}