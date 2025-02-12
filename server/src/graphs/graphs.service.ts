import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateGraphDto } from './dto/create-graph.dto';
import { Graph } from './graphs.model';


@Injectable()
export class GraphsService {
    constructor(@InjectModel(Graph) private readonly graphsRepository: Graph) {}
    async createGraph(dto: CreateGraphDto): Promise<Graph> {
        const graph = await Graph.create(dto);
        return graph;

    }
    async getAllGraphs(): Promise<Graph[]> {
        const graphs=await Graph.findAll();
        return graphs;
    }
}
