import { Controller, Post, Body, HttpException, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestO } from 'express';
import { UsersService } from '../users/users.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';

@ApiUseTags('atuh')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userServer: UsersService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: RequestO, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user as User);

    // password = md5(password);
    // const user = await this.authServer.varify(loginname);
    // if (user === null) {
    //   throw new HttpException('user not exist', 403);
    // }
    // if (user.password !== password) {
    //   throw new HttpException('password error', 403);
    // }
    // return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: RequestO) {
    return req.user;
  }
}
