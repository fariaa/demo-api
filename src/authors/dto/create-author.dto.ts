import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Nome do autor

  @IsEmail()
  @IsNotEmpty()
  email: string; // Email único do autor

  @IsOptional()
  @IsString()
  bio?: string; // Biografia ou descrição do autor (opcional)

  @IsOptional()
  @IsString()
  profilePicture?: string; // URL da foto de perfil do autor (opcional)
}
