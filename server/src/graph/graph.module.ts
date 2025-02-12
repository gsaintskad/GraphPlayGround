import { Module } from '@nestjs/common';
import { GraphController } from './graph.controller';
import { Graph } from "./graph.model"

@Module({
  controllers: [GraphController],
  providers: [Graph]
})
export class GraphModule {}
