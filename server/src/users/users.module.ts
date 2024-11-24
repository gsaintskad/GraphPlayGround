import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RolesModule,
        forwardRef(() => AuthModule),
        JwtModule,
    ],
    exports: [UsersService],
})
export class UsersModule {}
