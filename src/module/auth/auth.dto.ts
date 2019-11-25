import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty({ example: '13767284559' })
  @IsNotEmpty()
  loginname: string;

  @ApiModelProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;
}
