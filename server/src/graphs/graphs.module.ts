import { Module } from '@nestjs/common';
import { GraphsController } from './graphs.controller';
import { Graph } from "./graphs.model"
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { UserGraphs } from './user-graphs.model';
import { GraphsService } from './graphs.service';

@Module({
  controllers: [GraphsController],
  providers: [GraphsService],

  imports: [SequelizeModule.forFeature([Graph,User,UserGraphs])]
})
export class GraphsModule {}
