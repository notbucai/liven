import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { SmsBodyDto, UseType, SignupDto } from './common.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { md5 } from 'utility';
import { UsersService } from '../../../module/users/users.service';

@ApiUseTags('common')
@Controller()
export class CommonController {

  constructor(private readonly commonService: CommonService) { }

  @Post('sendSmsCodeToUser')
  async sendSmsCodeToUser(@Body() SmsBody: SmsBodyDto) {
    const { mobilePhoneNumber, useType } = SmsBody;

    switch (useType) {
      case UseType.signup:

        await this.commonService.isPhoneNotExist(mobilePhoneNumber);

        break;
      case UseType.update:

        break;
      case UseType.login:

        break;
    }
    const codeSms = await this.commonService.generate(mobilePhoneNumber);

    return { detail: codeSms };
  }

  @Post('signup')
  async signup(@Body() signup: SignupDto) {
    const { code, phone, username, password } = signup;
    const isVerify = await this.commonService.verifyCode(phone, code);

    if (!isVerify) {
      throw new HttpException('请检查验证码', 403);
    }
    await this.commonService.isUsernameNotExist(username);
    await this.commonService.isPhoneNotExist(phone);
    try {
      await this.commonService.createUser({ username, phone, password: md5(password) });

      await this.commonService.removeCode(phone);
    } catch (error) {
      throw new HttpException(error.errmsg || error.message, 403);
    }

    return {
      message: '注册成功',
    };
  }

}
