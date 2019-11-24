import { prop } from '@typegoose/typegoose';
import { IsNotEmpty, IsPhoneNumber, IsMobilePhone } from 'class-validator';

export class User {
  // 登陆名
  @prop({ required: true, unique: true })
  @IsNotEmpty()
  username: string;
  // 密码
  @prop()
  @IsNotEmpty()
  password: string;
  // 用户名
  @prop({ default: '' })
  name: string;
  // 头像
  @prop({ default: '' })
  avatar: string;
  // 介绍
  @prop({ default: '' })
  intro: string;
  // 主页
  @prop({ default: '' })
  page: string;
  // 手机号
  @prop({ unique: true, required: true })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  phone: string;
  // 注册时间
  @prop({ default: Date.now })
  createTime: Date;

}
