import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { Tag } from '../../schema/tag.schema';

@Controller('tags')
@ApiUseTags('tags')
export class TagsController {

  constructor(private readonly tagsService: TagsService) { }

  @Get()
  list() {
    return this.tagsService.read();
  }

  @Post()
  create(@Body() tagDto: Tag) {
    return this.tagsService.create(tagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tagsService.delete(id);
  }

  @Put()
  update(@Body() tagDto: Tag) {
    return this.tagsService.update(tagDto);
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.tagsService.getById(id);
  }

}
