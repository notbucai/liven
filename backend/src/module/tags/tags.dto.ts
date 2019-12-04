import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsMongoId } from 'class-validator';

export class TagDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsMongoId()
  tagId: string;
}
