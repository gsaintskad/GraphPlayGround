import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";

@Table({
    tableName: 'user_roles',
    updatedAt:false,
    createdAt:false,
})
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: '123', description: 'unique id' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;

    @ApiProperty({example: '12', description: 'unique user id' })
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId:number;

    @ApiProperty({example: '23', description: 'unique Role id' })
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId:number;


}
