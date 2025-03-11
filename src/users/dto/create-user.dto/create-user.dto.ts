import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'O email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'A senha do usuário (mínimo de 6 caracteres)',
    minLength: 6,
  })
  @IsNotEmpty()
  password: string;
}