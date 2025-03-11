import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'O email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'A senha do usuário',
  })
  @IsNotEmpty()
  password: string;
}