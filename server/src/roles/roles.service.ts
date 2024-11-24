import { Get, Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role)private readonly rolesRepository: typeof Role) {}

    async createRole(dto:CreateRoleDto) {
        const role=await this.rolesRepository.create(dto);
        return role;
    }
    async getRoleByValue(value: string) {
        console.log(value);
        const role = await this.rolesRepository.findOne({ where: { value } });
        return role;
    }
}
