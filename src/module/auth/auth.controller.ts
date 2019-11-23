import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { md5 } from 'utility';
import { User } from '../../common/schema/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private readonly authServer: AuthService) { }

  @Post('login')
  async login(@Body() { loginname, password }: LoginDto) {
    password = md5(password);
    return await this.authServer.varify(loginname, password);
  }
  @Post('register')
  async register(@Body() user: User) {
    user.password = md5(user.password);
    return await this.authServer.save(user);
  }
  @Post('repass')
  repass() {

  }
}
