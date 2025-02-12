import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { User } from './users/users.model';
import { GraphsModule } from './graphs/graphs.module';
import { NodeModule } from './node/node.module';
import { EgdeModule } from './egde/egde.module';
import { DisplaySettingsModule } from './display-settings/display-settings.module';
import { NodeColorsModule } from './node-colors/node-colors.module';
import { Graph } from './graphs/graphs.model';
import { UserGraphs } from './graphs/user-graphs.model';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Graph,UserGraphs],
      autoLoadModels: true,
    }),
    UsersModule,
    GraphsModule,
    NodeModule,
    EgdeModule,

    DisplaySettingsModule,
    NodeColorsModule,
  ],
})

export class AppModule {}

