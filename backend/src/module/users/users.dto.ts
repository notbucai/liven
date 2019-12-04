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

// tslint:disable-next-line: max-classes-per-file
export class FollowUserDto {
  user: string;
  followUser: string;
}
