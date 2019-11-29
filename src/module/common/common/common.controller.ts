import { Controller, Post, Body, HttpException, ForbiddenException } from '@nestjs/common';
import { SmsBodyDto, UseType, SignupDto } from './common.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { md5 } from 'utility';
import { SmsService } from '../sms/sms.service';
import { UsersService } from '../../../module/users/users.service';

@ApiUseTags('common')
@Controller()
export class CommonController {

  constructor(private readonly usersService: UsersService, private readonly smsService: SmsService) { }

  @Post('sendSmsCodeToUser')
  async sendSmsCodeToUser(@Body() SmsBody: SmsBodyDto) {

    const { mobilePhoneNumber, useType } = SmsBody;

    switch (useType) {
      case UseType.signup:

        if (await this.usersService.isPhoneNotExist(mobilePhoneNumber)) {
          throw new ForbiddenException('手机号已经存在');
        }

        break;
      case UseType.update:

        break;
      case UseType.login:

        break;
    }
    const codeSms = await this.smsService.generate(mobilePhoneNumber);

    return { detail: codeSms };
  }

  @Post('signup')
  async signup(@Body() signup: SignupDto) {
    const { code, phone, username, password } = signup;
    const isVerify = await this.smsService.verifyCode(phone, code) || process.env.NODE_ENV === 'dev';

    if (!isVerify) {
      throw new HttpException('请检查验证码', 403);
    }

    if (await this.usersService.isUsernameNotExist(username)) {
      throw new ForbiddenException('用户名已经存在');
    }

    if (await this.usersService.isPhoneNotExist(phone)) {
      throw new ForbiddenException('手机号已经存在');
    }

    try {
      await this.usersService.create({ username, phone, password: md5(password) });

      await this.smsService.removeCode(phone);
    } catch (error) {
      throw new HttpException(error.errmsg || error.message, 403);
    }

    return {
      message: '注册成功',
    };
  }

}
