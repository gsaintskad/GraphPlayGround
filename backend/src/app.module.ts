import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphModule } from './graph/graph.module';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [GraphModule, TreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
