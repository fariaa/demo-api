import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto/login-user.dto';

@ApiTags('Auth') // Agrupa as rotas sob o tag "Auth" na documentação
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' }) // Descrição do endpoint
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({
    description: 'Dados para registrar um novo usuário',
    type: CreateUserDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de payload',
        description: 'Exemplo de como enviar os dados para registrar um usuário',
        value: {
          email: 'joao.silva@example.com',
          password: 'password123',
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário e obter um token JWT' }) // Descrição do endpoint
  @ApiResponse({ status: 200, description: 'Login bem-sucedido, retorna o token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiBody({
    description: 'Dados para fazer login',
    type: LoginUserDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de payload',
        description: 'Exemplo de como enviar os dados para fazer login',
        value: {
          email: 'joao.silva@example.com',
          password: 'password123',
        },
      },
    },
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}