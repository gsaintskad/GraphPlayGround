import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";
// the model is required to describe how a Role record of table Roles should look like,
// which columns with which properties, should have

interface RoleCreationAttributes {
    value:string;
    description:string;
}

@Table({
    tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttributes> {

    @ApiProperty({example: '123', description: 'unique id' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;

    @ApiProperty({example: 'admin', description: 'describes user\'s role' })
    @Column({type:DataType.STRING,unique:true, allowNull:false})
    value: string;

    @ApiProperty({example: 'admin is able to ban anyone', description: 'accurate description of a role' })
    @Column({type:DataType.STRING, allowNull:false})
    description: string;

    @BelongsToMany(() => User, (role) => UserRoles)
    users:User[];

}
