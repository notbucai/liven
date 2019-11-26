import { ApiModelProperty } from '@nestjs/swagger';

export enum EType {
  all = 'all',
}

export class ListQueryDto {
  @ApiModelProperty({ required: false })
  p?: number;

  @ApiModelProperty({ required: false })
  q?: string;

  @ApiModelProperty({ required: false, enum: ['all', 'a', 'b'] })
  type?: EType;
}