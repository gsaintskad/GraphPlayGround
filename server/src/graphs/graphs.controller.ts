import { Body, Controller, Get, Post } from '@nestjs/common';

import { GraphsService } from './graphs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Graph } from './graphs.model';
import { CreateGraphDto } from './dto/create-graph.dto';
@ApiTags('graphs')
@Controller('graphs')
export class GraphsController {
    constructor(private readonly graphsService: GraphsService) {}
    @ApiOperation({ summary: 'Create graphs' })
    @ApiResponse({ status: 201, description: 'graphs created successfully.', type:Graph })
    @Post()
    create(@Body() creategraphDto: CreateGraphDto) {
        return this.graphsService.createGraph(creategraphDto);
    }
    @ApiOperation({ summary: 'Update graphs' })
    @ApiResponse({ status: 200, description: 'graphs updated successfully.', type:[Graph] })
    @Get()
    getAll(){
        return this.graphsService.getAllGraphs();
    }
}
