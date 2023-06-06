import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
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
}
