import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GraphService } from './graph.service';
import { CreateGraphDto } from './dto/create-graph.dto';
import { UpdateGraphDto } from './dto/update-graph.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post()
  create(@Body() createGraphDto: CreateGraphDto) {
    return this.graphService.create(createGraphDto);
  }

  @Get()
  findAll() {
    return this.graphService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGraphDto: UpdateGraphDto) {
    return this.graphService.update(+id, updateGraphDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graphService.remove(+id);
  }
}
