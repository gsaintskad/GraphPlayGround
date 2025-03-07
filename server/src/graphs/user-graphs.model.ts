import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { User } from '../users/users.model';
import { Graph } from './graphs.model';


@Table({ tableName: "user_graphs" , createdAt:false,updatedAt:false })
export class UserGraphs extends Model<UserGraphs> {
    @ApiProperty({ example: "131212" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: number;

    @ApiProperty({ example: "131212" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,

    })
    userId: number;


    @ApiProperty({ example: "131212" })
    @ForeignKey(() =>Graph)
    @Column({
        type: DataType.STRING,
    })
    graphId: string;



}
