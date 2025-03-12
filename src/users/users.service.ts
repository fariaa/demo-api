import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Criptografa a senha
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({ email });
        return user || undefined;
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword); // Compara a senha fornecida com o hash armazenado
    }
}
