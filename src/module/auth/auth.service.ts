import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { md5 } from 'utility';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../common/schema/user.schema';
enum LoginType {
  LOGINNAME_ERROR,
  LOGINPASS_ERROR,
  LOGIN_SUCCESS,
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userServer: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  loginType = LoginType;

  async validate(loginname: string, password: string) {
    let find = null;
    if (/^1[3456789]\d{9}$/.test(loginname)) {
      find = this.userServer.findByPhone;
    } else {
      find = this.userServer.findByUsername;
    }
    const user = await find.call(this.userServer, loginname);
    if (user === null) {
      throw new NotFoundException('user not found');
    }
    if (user && user.password === md5(password)) {
      return user;
    }
    throw new UnauthorizedException('password ERROR');
  }
  async login(user: User) {
    const payload = { id: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
