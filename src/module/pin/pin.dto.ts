import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class PinCommentDto {
  @ApiModelProperty()
  @IsMongoId()
  @IsOptional()
  replyUser?: string;

  @ApiModelProperty()
  @IsMongoId()
  @IsOptional()
  replyComment?: string;

  @ApiModelProperty()
  content: string;

  @ApiModelProperty()
  @IsMongoId()
  @IsOptional()
  pic?: string;
}
