import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';

@Module({
  controllers: [TreeController],
  providers: [TreeService],
})
export class TreeModule {}
