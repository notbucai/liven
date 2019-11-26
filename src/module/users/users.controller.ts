import { Controller, Get, Param, Query, UnauthorizedException, ForbiddenException, Delete, Put, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { ListQueryDto, EType } from './users.dto';
import { User } from '../../common/schema/user.schema';
import { md5 } from 'utility';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServer: UsersService) { }

  @Get(':id')
  async user(@Param('id') id: string) {
    const user = await this.userServer.findById(id);
    delete user.password;
    return user;
  }

  @Get()
  async list(@Query() listQuery: ListQueryDto) {
    const { p = 1, q, type } = listQuery || {};
    if (!(Number(p) > 0)) {
      throw new ForbiddenException('参数错误');
    }
    return await this.userServer.list(q, p, type);
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
}
