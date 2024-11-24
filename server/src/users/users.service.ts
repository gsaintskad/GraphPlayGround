import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private usersRepository: typeof User,
        private readonly rolesService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('user');

        if (!role) {
            throw new Error("Role 'user' not found. Please ensure the role exists in the database.");
        }

        await user.$set('roles', [role.id]);
        return user;
    }
    async getAllUsers() {
        const users = await this.usersRepository.findAll({
            include: { all: true },
        });
        return users;
    }
    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: { email },
            include: { all: true },
        });
    }
}
