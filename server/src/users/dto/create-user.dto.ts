import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "123@gmail.com" })
  readonly email: string;
  @ApiProperty({ example: "iwonttellyou" })
  readonly password: string;
}
