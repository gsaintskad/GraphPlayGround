import {
    Body,
    HttpException,
    HttpStatus,
    Injectable,
    Post, UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(userDto: CreateUserDto) {
        const user= await this.validateUser(userDto);
        return this.generateJwtToken(user);

    }

    async registration(userDto: CreateUserDto) {
        if (await this.userService.getUserByEmail(userDto.email)) {
            throw new HttpException(
                'Email already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        // const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({
            ...userDto,
            // password: hashPassword,
        });
        return await this.generateJwtToken(user);
        // const candidate=this.userService.createUser(userDto);
    }
    async generateJwtToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Compare the plain text password (from userDto) with the hashed password (from user)
        // const hashedPassword = await bcrypt.hash(userDto.password, 10);
        // const passwordEqual = await bcrypt.compare(hashedPassword,user.password);

    //     console.log(`\n\n\n
    // ${userDto.email},${hashedPassword}\n
    // ${user.email},${user.password}\n
    // ${passwordEqual}\n
    // \n\n\n`);

        if (user.password === userDto.password) {
            return user;
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }
}
