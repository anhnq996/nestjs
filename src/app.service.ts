import { Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/User.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  response(res: Response, i18n, data, code, status = 200): void {
    const response = {
      code,
      message: i18n.t(`response.${code}`),
      data,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(status).json(response);
  }

  async hash(plainText, salt = 10): Promise<string> {
    const appKey = this.configService.get('APP_KEY');
    return bcrypt.hash(`${plainText}_${appKey}`, salt);
  }

  async compare(plainText, hash, salt = 10): Promise<boolean> {
    const appKey = this.configService.get('APP_KEY');
    return bcrypt.compare(`${plainText}_${appKey}`, hash);
  }
}
