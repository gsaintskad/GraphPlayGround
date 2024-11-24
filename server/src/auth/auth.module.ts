import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { UserRoles } from '../roles/user-roles.model';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SECRET',
            signOptions: { expiresIn: '24h' },
        }),
        forwardRef(() => UsersModule),
    ],
    exports: [AuthService,JwtModule],
})
export class AuthModule {}
