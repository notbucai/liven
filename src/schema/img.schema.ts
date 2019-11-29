import { prop, mongoose } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiModelProperty } from '@nestjs/swagger';

export class Img extends Base {

  @prop()
  @ApiModelProperty({ example: 'https://www.baidu.com/img/baidu_resultlogo@2.png' })
  url: string;

  @prop({ default: Date.now() })
  createTime: Date;

}
