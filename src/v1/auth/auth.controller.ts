import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppService } from '../../app.service';
import { LoginDto } from './dto/login.dto';
import { response } from '@helpers/utils.helpers';
import { I18nService } from 'nestjs-i18n';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
    private readonly i18n: I18nService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const username = loginDto.username;
    const user = await this.authService.findUserByUsername(username);

    if (!user) {
      response(res, this.i18n, null, 'E1001');
    }

    response(
      res,
      this.i18n,
      {
        token: 'access token',
        user,
      },
      'E1001',
    );
    return this.authService.login(loginDto);
  }
}
