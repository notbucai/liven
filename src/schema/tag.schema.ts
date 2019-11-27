import { prop, mongoose, isDocument, Ref, getModelForClass } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';
import { Img } from './img.schema';
import { IsNotEmpty } from 'class-validator';

export class Tag extends Base {

  @ApiModelProperty()
  @prop({ required: true, unique: true })
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @prop()
  desc: string;

  @ApiModelProperty({ example: '' })
  @prop({ ref: Img })
  img: Ref<Img>;

  // 时间
  @prop({ default: Date.now })
  createTime: Date;

}
