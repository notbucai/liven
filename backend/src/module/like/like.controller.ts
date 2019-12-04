import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from '../../schema/like.schema';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('like')
@ApiUseTags('like')
export class LikeController {

  constructor(private readonly likeService: LikeService) { }

  @Get()
  list() {
    return this.likeService.read();
  }

  @Post()
  create(@Body() modelDto: Like) {
    return this.likeService.create(modelDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.likeService.delete(id);
  }

  @Put()
  update(@Body() modelDto: Like) {
    return this.likeService.update(modelDto);
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.likeService.getById(id);
  }
}
