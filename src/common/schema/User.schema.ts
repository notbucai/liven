import { prop } from '@typegoose/typegoose';

export class User {
  // 登陆名
  @prop({ required: true, unique: true })
  username: string;
  // 密码
  @prop()
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
  @prop({ unique: true })
  phone: string;
  // 注册时间
  // 手机号
  @prop({ default: Date.now })
  createTime: Date;
}
