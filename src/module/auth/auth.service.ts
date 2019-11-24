import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { md5 } from 'utility';

export enum LoginType {
  USER_NAME = 1,
  PHONE = 2,
}

@Injectable()
export class AuthService {
  constructor(private readonly userServer: UsersService) { }

  async validate(loginname: string, password: string, type = LoginType.USER_NAME) {
    let find = null;
    if (type === LoginType.USER_NAME) {
      find = this.userServer.findByUsername;
    } else if (type === LoginType.PHONE) {
      find = this.userServer.findByPhone;
    } else {
      return false;
    }
    const user = await find.call(this.userServer, loginname);

    if (user && user.password === md5(password)) {
      return user;
    }
    return false;
  }

}
