import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'vasichkin@gmail.com',
    description: 'responsible for unique email address',
  })
  readonly email: string;
  @ApiProperty({
    example: 'strongPswd@123',
    description: 'responsible for password',
  })
  readonly password: string;
}
