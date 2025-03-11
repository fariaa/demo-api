import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user || !(await this.usersService.validatePassword(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Gera o token JWT
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('O email já está em uso');
    }

    await this.usersService.create(createUserDto);
    return { message: 'Usuário registrado com sucesso!' };
  }
}
