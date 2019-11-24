import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userServer: UsersService) { }

  @Get('test')
  test() {
    return this.userServer.findByUsername('123123');
  }
}
