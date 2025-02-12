import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAttributes {
  email: string;
  password: string;
}
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: "131212" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({ example: "goyslop@ukr.net" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: "1234567890" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @ApiProperty({ example: "false" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBanned: boolean;
}
