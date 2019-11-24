import { Controller, Post, Body, HttpException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { md5 } from 'utility';
import { User } from '../../common/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestO } from 'express';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userServer: UsersService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: RequestO) {
    return req.user;
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
  @Post('register')
  async register(@Body() user: User) {
    // if (this.authServer.isUsernameNotExist(user.username)) {
    //   throw new HttpException('username exist', 403);
    // }
    // if (this.authServer.isPhoneNotExist(user.phone)) {
    //   throw new HttpException('phone exist', 403);
    // }
    // try {
    //   user.password = md5(user.password);
    //   // 在这里想办法把token整出去
      return await this.userServer.save(user);
    // } catch (error) {
    //   throw new HttpException(error.errmsg || error.message, 403);
    // }
  }
  @Post('repass')
  repass() {

  }
}
