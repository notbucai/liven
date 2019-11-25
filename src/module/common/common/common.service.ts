import { Injectable, HttpException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { UsersService } from '../../../module/users/users.service';
import { SignupDto } from './common.dto';
import { User, IUser } from '../../../common/schema/user.schema';

@Injectable()
export class CommonService {
  constructor(private readonly redis: RedisService, private readonly userService: UsersService) { }
  getCodeKey(key: string) {
    return `${key}_code`;
  }
  async generate(key: string) {
    // 判断一分钟内是否获取过
    key = this.getCodeKey(key);
    const codeObj = await this.redis.get(key);
    if (codeObj) {
      if (Date.now() - codeObj.now < 0.8 * 60 * 1000) {
        throw new HttpException('请一分钟后再获取', 403);
      }
    }

    const code = Math.floor((Math.random() * (1000000 - 100000)) + 100000).toString();
    // 请求发送短信

    this.redis.set(key, { code, now: Date.now() });

    return code;
  }

  async verifyCode(key: string, code: string) {
    const codeObj = await this.redis.get(this.getCodeKey(key));

    if (codeObj) {
      if (Date.now() - codeObj.now <= 15 * 60 * 1000) {
        if (codeObj.code === code) {
          return true;
        }
      }
    }

    return false;
  }

  async removeCode(key: string) {
    await this.redis.remove(this.getCodeKey(key));
  }

  async isPhoneNotExist(phone: string) {
    if (await this.userService.isPhoneNotExist(phone)) {
      throw new HttpException('手机号已存在', 403);
    }
  }

  async isUsernameNotExist(username: string) {
    if (await this.userService.isUsernameNotExist(username)) {
      throw new HttpException('登录名已存在', 403);
    }
  }

  async createUser(user: IUser) {
    await this.userService.create(user);
  }

}
