import {
  Controller, Get, Param, Query, UnauthorizedException,
  ForbiddenException, Delete, Put, Body, Post, UseGuards, Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiUseTags, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ListQueryDto, EType } from './users.dto';
import { User } from '../../schema/user.schema';
import { md5 } from 'utility';
import { TagsService } from '../tags/tags.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestO } from 'express';
import { IPlayload } from '../auth/jwt.strategy';
import { isMongoId } from 'validator';
@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServer: UsersService) { }

  @Get()
  async list(@Query() listQuery: ListQueryDto) {
    const { p = 1, q, type } = listQuery || {};
    if (!(Number(p) > 0)) {
      throw new ForbiddenException('参数错误');
    }
    return await this.userServer.list(q, p, type);
  }

  @ApiBearerAuth()
  @Get('follow')
  @UseGuards(AuthGuard('jwt'))
  async follow(@Query('id') id: string, @Request() req: RequestO) {

    if (!isMongoId(id)) {
      throw new ForbiddenException('ID 不能为空');
    }
    const { id: userId } = req.user as IPlayload;
    if (id === userId) {
      throw new ForbiddenException('不能对自己进行操作');
    }

    return await this.userServer.follow({ user: userId, followUser: id });
  }

  @ApiBearerAuth()
  @Get('unfollow')
  @UseGuards(AuthGuard('jwt'))
  async unfollow(@Query('id') id: string, @Request() req: RequestO) {
    if (!isMongoId(id)) {
      throw new ForbiddenException('ID 不能为空');
    }
    const { id: userId } = req.user as IPlayload;
    if (id === userId) {
      throw new ForbiddenException('不能对自己进行操作');
    }
    return await this.userServer.unfollow({ user: userId, followUser: id });
  }

  @Get(':id')
  async user(@Param('id') id: string) {
    const user = await this.userServer.findById(id);
    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.userServer.deleteById(id);
    return user;
  }

  @Post()
  async create(@Body() user: User) {
    user.password = md5(user.password);
    return await this.userServer.create(user);
  }

  @Put()
  async update(@Body() user: User) {
    user.password = md5(user.password);
    return await this.userServer.update(user);
  }

  // 关注者
  @Get(':id/followerList')
  async followerList(@Param('id') id: string) {
    return this.userServer.followerList(id);
  }

  // 关注了
  @Get(':id/followList')
  followList(@Param('id') id: string) {
    return this.userServer.followList(id);
  }

}
