import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,

    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) { }

  async create(dto: CreateArticleDto) {
    // Verifica se o autor existe
    const author = await this.authorsRepository.findOneBy({ id: dto.authorId  });
    if (!author) {
      throw new NotFoundException('Author not found'); // Você pode usar uma exceção personalizada aqui
    }

    // Cria o artigo com a relação ao autor
    const article = this.repository.create({
      ...dto,
      author, // Relaciona o autor ao artigo
    });

    return this.repository.save(article);
  }

  findAll() {
    return this.repository.find({ relations: ['author'] }); // Inclui o autor no resultado
  }

  
  findOne(id: string) {
    return this.repository.findOneBy({ id }); // Inclui o autor no resultado
  }
  

  async update(id: string, dto: UpdateArticleDto) {
    const article = await this.repository.findOneBy({ id });
    if (!article) return null;
    this.repository.merge(article, dto);
    return this.repository.save(article);
  }

  async remove(id: string) {
    const article = await this.repository.findOneBy({ id });
    if (!article) return null;
    return this.repository.remove(article);
  }
}