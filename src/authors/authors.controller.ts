import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@ApiBearerAuth('access-token')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const author = await this.authorsService.findOne(id);
    if(!author) throw new NotFoundException;
    return author;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsService.update(id, updateAuthorDto);
    if(!author) throw new NotFoundException;
    return author;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const author = await this.authorsService.remove(id);
    if(!author) throw new NotFoundException;
  }
}
