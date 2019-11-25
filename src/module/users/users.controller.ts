import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/schema/user.schema';
import { Request as RequestO } from 'express';
import { IPlayload } from '../auth/jwt.strategy';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServer: UsersService) { }

  @Get(':id')
  async test(@Param('id') id: string) {
    const user = await this.userServer.findById(id);
    delete user.password;
    return user;
  }

}
