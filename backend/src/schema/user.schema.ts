import { prop, mongoose, Ref, isDocument } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { Img } from './img.schema';

export interface IUser {
  username: string;
  password: string;
  phone: string;
  avatar?: Ref<Img>;
  page?: string;
  intro?: string;
  createTime?: Date;
}

export class User extends Base implements IUser {

  // _id?: string;
  // 登陆/用户名名
  @prop({ required: true, unique: true })
  @ApiModelProperty()
  username: string;
  // 密码
  @prop()
  @ApiModelProperty()
  password: string;
  // // 用户名
  // @prop({ default: '' })
  // name: string;
  // 头像
  @ApiModelProperty()
  @prop({ ref: Img })
  avatar?: Ref<Img>;

  // 介绍
  @ApiModelProperty({ example: '' })
  @prop({ default: '' })
  intro: string;
  @ApiModelProperty({ example: '' })
  // 主页
  @prop({ default: '' })
  page: string;

  // 手机号
  @prop({ unique: true, required: true })
  @ApiModelProperty()
  phone: string;
  // 注册时间
  @prop({ default: Date.now })
  createTime: Date;

}
