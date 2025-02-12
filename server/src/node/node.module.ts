import { Module } from '@nestjs/common';
import { NodeController } from './node.controller';

@Module({
  controllers: [NodeController]
})
export class NodeModule {}
