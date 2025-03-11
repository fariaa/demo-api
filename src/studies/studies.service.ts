import { Injectable } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { Repository } from 'typeorm';
import { Study } from './entities/study.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudiesService {

  constructor(
    @InjectRepository(Study)
    private readonly repository: Repository<Study>
  ){

  }

  create(dto: CreateStudyDto) {
    const study = this.repository.create(dto);
    return this.repository.save(study);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({id});
  }

  async update(id: string, dto: UpdateStudyDto) {
    const study = await this.repository.findOneBy({id});
    if(!study) return null;
    this.repository.merge(study, dto);
    return this.repository.save(study);
  }

  async remove(id: string) {
    const study = await this.repository.findOneBy({id});
    if(!study) return null;
    return this.repository.remove(study);
  }
}
