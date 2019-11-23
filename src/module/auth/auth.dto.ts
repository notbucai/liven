import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  loginname: string;
  @IsNotEmpty()
  password: string;
}
