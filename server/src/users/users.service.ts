import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly usersRepository: User) {}
    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await User.create(dto);
        return user;

    }
    async getAllUsers(): Promise<User[]> {
        const users=await User.findAll();
        return users;
    }
}
