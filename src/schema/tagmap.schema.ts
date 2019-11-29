import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { Tag } from './tag.schema';
import { User } from './user.schema';

/**
 * 关联tag和用户的
 */
export class TagMap extends Base {
  @ApiModelProperty()
  @prop({ ref: Tag })
  tag: Ref<Tag>;

  @ApiModelProperty()
  @prop({ ref: User })
  user: Ref<User>;
}
