import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, Request } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { Tag } from '../../schema/tag.schema';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestO } from 'express';
import { TagDto } from './tags.dto';
import { IPlayload } from '../auth/jwt.strategy';

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

  @Get(':id/attendees')
  readById(@Param('id') id: string) {
    return this.tagsService.byTagId(id);
  }

  @Post('attended')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  attended(@Request() req: RequestO, @Body() tagDto: TagDto) {
    const { id } = req.user as IPlayload;
    const { tagId } = tagDto;
    return this.tagsService.attended({ user: id, tag: tagId });
  }

  @Post('unattended')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  unattended(@Request() req: RequestO, @Body() tagDto: TagDto) {
    const { id } = req.user as IPlayload;
    const { tagId } = tagDto;
    return this.tagsService.unattended({ user: id, tag: tagId });
  }

}
