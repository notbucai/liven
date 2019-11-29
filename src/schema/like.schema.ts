import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './user.schema';
import { Pin } from './pin.schema';

export class Like extends Base {

  @prop({ ref: User })
  user: Ref<User>;

  @prop({ ref: Pin })
  pin: Ref<Pin>;

  @prop({ default: Date.now() })
  createTime: Date;

}
