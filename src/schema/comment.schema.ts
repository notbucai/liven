import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './user.schema';
import { Pin } from './pin.schema';
import { Img } from './img.schema';

export class Comment extends Base {

  // 当前用户
  @ApiModelProperty()
  @prop({ ref: User, required: true })
  user: Ref<User>;

  // 回复的沸点
  @ApiModelProperty()
  @prop({ ref: Pin, required: true })
  pin: Ref<Pin>;

  // 回复的用户
  @ApiModelProperty()
  @prop({ ref: User })
  replyUser?: Ref<User>;

  // 回复的评论
  @ApiModelProperty()
  @prop({ ref: Comment })
  replyComment?: Ref<Comment>;

  // 正文
  @ApiModelProperty()
  @prop({ required: true })
  content: string;

  // 图片
  @ApiModelProperty()
  @prop({ ref: Img })
  pic?: Ref<Img>;

  @prop({ default: Date.now() })
  createTime?: Date;

}
