import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }
    @ApiOperation({summary: 'Creates a user'})
    @ApiResponse({status: 201,type:User, description: 'Successfully created'})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    @ApiOperation({summary: 'Selects array of all users in DB'})
    @ApiResponse({status: 201,type: [User], description: 'Successfully selected'})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }
}
