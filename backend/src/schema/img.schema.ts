import { prop, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './user.schema';

export class Img extends Base {

  @prop()
  @ApiModelProperty({ example: 'c20d50a9bd9aca9c665fdac808670323' })
  url: string;

  // ref 循环引用导致问题，改用字符串
  @ApiModelProperty()
  @prop({ ref: 'User', required: true })
  user: Ref<User>;

  @prop({ default: Date.now() })
  createTime?: Date;

}
