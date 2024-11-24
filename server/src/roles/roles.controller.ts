import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";


@Controller('roles')
export class RolesController {
    constructor( private readonly rolesService: RolesService) {
    }
    @Get('/:value')
    getByValue(@Param('value')value: string) {
        return this.rolesService.getRoleByValue(value);
    }
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }
}
