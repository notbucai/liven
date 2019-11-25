import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'loginname',
      passwordField: 'password',
    });
  }

  async validate(loginname: string, password: string): Promise<any> {
    const user = await this.authService.validate(loginname, password);
    if (!user) {
      throw new UnauthorizedException('username or password error');
    }
    return user;
  }
}
