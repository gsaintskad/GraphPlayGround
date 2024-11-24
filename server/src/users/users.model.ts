import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
// the model is required to describe how a user record of table users should look like,
// which columns with which properties, should have

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({
    tableName: 'users',
})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({ example: '123', description: 'unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,

    })
    id: number;

    @ApiProperty({
        example: 'vasichkin@gmail.com',
        description: 'responsible for unique email address',
    })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({
        example: 'strongPswd@123',
        description: 'responsible for password',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    //next 2 columns, responsible for user bans, should be as a new table because its relation is m2n
    @ApiProperty({
        example: 'true',
        description: 'Describe if a user is banned',
    })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({
        example: 'text harassment',
        description: 'the reason why the user has been banned',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, (role) => UserRoles)
    roles: Role[];
}
