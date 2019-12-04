import { Controller, Param, Get, Body, Delete, Post, Put, UseGuards, Request } from '@nestjs/common';
import { PinService as Service } from './pin.service';
import { Pin as SchemaDto } from '../../schema/pin.schema';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LikeService } from '../like/like.service';
import { CommentService } from '../comment/comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestO } from 'express';
import { Comment as CommentDto } from '../../schema/comment.schema';
import { PinCommentDto } from './pin.dto';
import { IPlayload } from '../auth/jwt.strategy';
import { ITag } from '../like/like.dto';

@Controller('pin')
@ApiUseTags('pin')
export class PinController {
  constructor(
    private readonly service: Service,
    private readonly likeService: LikeService,
    private readonly commentService: CommentService,
  ) { }

  @Get()
  list() {
    return this.service.read();
  }

  @Post()
  create(@Body() tagDto: SchemaDto) {
    return this.service.create(tagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Put()
  update(@Body() tagDto: SchemaDto) {
    return this.service.update(tagDto);
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get(':id/likeList')
  likeList(@Param('id') id: string) {
    return this.likeService.getByPId(id);
  }

  @Get(':id/comments')
  commentList(@Param('id') id: string) {
    return this.commentService.getByPId(id);
  }

  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  comment(@Request() req: RequestO, @Param('id') id: string, @Body() pinComment: PinCommentDto) {
    const { id: userId } = req.user as IPlayload;
    // 难受了，类型不匹配
    const commentBody: any = {
      ...pinComment,
      user: userId,
      pin: id,
    };
    return this.commentService.create(commentBody);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  like(@Request() req: RequestO, @Param('id') id: string) {
    const { id: userId } = req.user as IPlayload;
    const likeObj = {
      user: userId,
      pin: id,
    };
    return this.likeService.like(likeObj);
  }

}
