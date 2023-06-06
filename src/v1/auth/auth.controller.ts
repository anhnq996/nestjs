import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppService } from '../../app.service';
import { LoginDto } from './dto/login.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
