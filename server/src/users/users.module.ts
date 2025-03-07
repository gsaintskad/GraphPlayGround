import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Graph } from '../graphs/graphs.model';
import { UserGraphs } from '../graphs/user-graphs.model';

@Module({
  controllers: [UsersController],
  providers: [ UsersService],
  imports: [SequelizeModule.forFeature([User,Graph,UserGraphs])]
})
export class UsersModule {}
