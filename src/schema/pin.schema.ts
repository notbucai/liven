import { prop, mongoose, Ref, arrayProp } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { Img } from './img.schema';
import { Tag } from './tag.schema';

export class User extends Base {

  // _id?: string;
  // 登陆/用户名名
  @ApiModelProperty()
  @prop({ required: true, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @ApiModelProperty({ required: false })
  @arrayProp({ itemsRef: Img })
  picList?: Array<Ref<Img>>;

  @ApiModelProperty()
  @prop({ required: true })
  content: string;

  @ApiModelProperty()
  @prop({ ref: Tag })
  tagId?: Ref<Tag>;

  @ApiModelProperty()
  @prop({ default: Date.now() })
  createTime: Date;

}
