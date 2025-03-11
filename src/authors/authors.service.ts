import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) { }

  create(dto: CreateAuthorDto) {
    const author = this.repository.create(dto);
    return this.repository.save(author);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateAuthorDto) {
    const author = await this.repository.findOneBy({ id });
    if (!author) return null;
    this.repository.merge(author, dto);
    return this.repository.save(author);
  }

  async remove(id: string) {
    const author = await this.repository.findOneBy({ id });
    if (!author) return null;
    return this.repository.remove(author);
  }
}
