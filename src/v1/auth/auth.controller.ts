import {
  Body,
  Controller,
  Post,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/login.request';
import { response } from '@helpers/utils.helpers';
import { I18nService } from 'nestjs-i18n';
import RoleGuard from '../../providers/role.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller({
  version: '1',
  path: 'auth',
})
@UseGuards(RoleGuard('admin'))
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

  @Post('login')
  async login(@Body() request: LoginRequest, @Res() res: Response) {
    const result = await this.authService.login(request);
    return response(res, this.i18n, result.data, result.code);
  }
}
