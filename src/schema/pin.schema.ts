import { prop, mongoose, Ref, arrayProp } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { Img } from './img.schema';
import { Tag } from './tag.schema';
import { User } from './user.schema';

export class Pin extends Base {

  // 用户
  @ApiModelProperty()
  @prop({ required: true, ref: User })
  user: Ref<User>;

  // 图片列表
  @ApiModelProperty({ required: false })
  @arrayProp({ itemsRef: Img })
  picList?: Array<Ref<Img>>;

  // 正文
  @ApiModelProperty()
  @prop({ required: true })
  content: string;

  // 标签
  @ApiModelProperty({required: false})
  @prop({ ref: Tag })
  tag?: Ref<Tag>;

  // 创建时间
  @ApiModelProperty()
  @prop({ default: Date.now() })
  createTime: Date;

}
