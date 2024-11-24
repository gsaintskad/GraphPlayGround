import {forwardRef, Module} from '@nestjs/common'; // Import the correct Module decorator

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "node:process";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [],
  providers: [JwtModule, UsersModule],
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USERNAME ,
      password: process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      models: [User, Role,UserRoles],
      autoLoadModels: true, //its need to auto creation relation basing on modules in nest app
    }),
    forwardRef(()=>UsersModule),
    RolesModule,
    AuthModule,
  ],
  exports:[AuthModule,JwtModule],
})
export class AppModule {}
