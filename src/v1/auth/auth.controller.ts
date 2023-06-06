import { Controller, Get, Post, Body, Res, UseFilters, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppService } from '../../app.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { LoginDto } from './dto/login.dto';
import { HandlerFilter } from '../../exceptions/handler.filter';

@UseFilters(HandlerFilter)
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('login')
  @UseFilters(HandlerFilter)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get()
  async findAll(@Res() res: Response, @I18n() i18n: I18nContext) {
    const users = await this.authService.findAll();
    return this.appService.response(res, i18n, users, 'S1000');
  }
}
