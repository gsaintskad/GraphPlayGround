import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserGraphs } from './user-graphs.model';
interface GraphCreationAttributes {
  readonly id: string;
  readonly creatorId: number;
  readonly isDirected: boolean;
  // readonly name?:string;
}
@Table({ tableName: "graphs" })
export class Graph extends Model<Graph, GraphCreationAttributes> {
  @ApiProperty({ example: "131212" })
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: "131212" })
  @Column({
    type: DataType.INTEGER,
  })
  creatorId: number;
  @ApiProperty({
    example: "false",
    description:
      "this flag describes is user allowed to use direct connections or not",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDirected: boolean;

  @BelongsToMany(() => User, () => UserGraphs)
  users: User[];
}
