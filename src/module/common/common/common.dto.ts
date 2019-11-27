import { ApiModelProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsEnum, IsEmpty, IsNotEmpty } from 'class-validator';
import { User } from 'src/schema/user.schema';

export enum UseType {
  signup,
  login,
  update,
}

export class SmsBodyDto {
  @ApiModelProperty({ example: '13767284559' })
  @IsMobilePhone('zh-CN')
  mobilePhoneNumber: string;
  @ApiModelProperty({ example: UseType.signup, enum: UseType })
  @IsEnum(UseType)
  useType: number;
  // @ApiModelProperty()
  // @IsNotEmpty()
  // code: string;
}

// tslint:disable-next-line: max-classes-per-file
export class SignupDto extends User {
  @ApiModelProperty({ example: 'bucai' })
  @IsNotEmpty()
  username: string;

  @ApiModelProperty({ example: '13767284559' })
  @IsMobilePhone('zh-CN')
  phone: string;

  @ApiModelProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiModelProperty({ example: '123456' })
  @IsNotEmpty()
  code: string;
}
