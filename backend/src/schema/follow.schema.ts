import { prop, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './user.schema';

export class Follow extends Base {

  // 当前用户
  @ApiModelProperty()
  @prop({ ref: User, required: true })
  user: Ref<User>;

  // 关注的用户
  @ApiModelProperty()
  @prop({ ref: User })
  followUser: Ref<User>;

  @prop({ default: Date.now() })
  createTime: Date;

}
