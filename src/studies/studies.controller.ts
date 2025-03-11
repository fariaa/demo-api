import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Get()
  findAll() {
    return this.studiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const study = await this.studiesService.findOne(id);
    if(!study) throw new NotFoundException();
    return study;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto) {
    const study = await this.studiesService.update(id, updateStudyDto);
    if(!study) throw new NotFoundException();
    return study;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const study = await this.studiesService.remove(id);
    if(!study) throw new NotFoundException();
  }
}
