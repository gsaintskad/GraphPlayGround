import { Module } from '@nestjs/common';
import { EgdeController } from './egde.controller';

@Module({
  controllers: [EgdeController]
})
export class EgdeModule {}
