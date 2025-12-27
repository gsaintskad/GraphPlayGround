import { Body, Controller, Post, Param, Put, Get, UseGuards, Req } from '@nestjs/common';
import { GraphService } from './graph.service';
import { SaveGraphDto } from './dto/save-graph.dto';
import { ComputeAlgorithmDto } from './dto/compute-algorithm.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  saveGraph(@Body() saveGraphDto: SaveGraphDto, @Req() req) {
    return this.graphService.saveGraph(saveGraphDto, req.user.userId);
  }

  @Get(':id')
  getGraph(@Param('id') id: string) {
    return this.graphService.getGraph(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateGraph(
    @Param('id') id: string,
    @Body() saveGraphDto: SaveGraphDto,
    @Req() req,
  ) {
    return this.graphService.saveGraph(saveGraphDto, req.user.userId, id);
  }

  @Post(':id/compute')
  computeAlgorithm(
    @Param('id') id: string,
    @Body() computeDto: ComputeAlgorithmDto,
  ) {
    return this.graphService.computeAlgorithm(id, computeDto);
  }
}