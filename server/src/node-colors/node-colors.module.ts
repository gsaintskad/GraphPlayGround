import { Module } from '@nestjs/common';
import { NodeColorsController } from './node-colors.controller';

@Module({
  controllers: [NodeColorsController]
})
export class NodeColorsModule {}
