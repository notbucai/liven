import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    
  }
  @Post('register')
  register() {

  }
  @Post('repass')
  repass() {
    
  }
}
