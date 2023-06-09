import * as bcrypt from 'bcrypt';

export function response(res: Response, i18n, data, code, status = 200): void {
  const response = {
    code,
    message: i18n.t(`response.${code}`),
    data,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.status(status).json(response);
}
export async function hash(plainText, salt = 10): Promise<string> {
  const appKey = this.configService.get('APP_KEY');
  return bcrypt.hash(`${plainText}_${appKey}`, salt);
}

export async function compare(plainText, hash): Promise<boolean> {
  const appKey = this.configService.get('APP_KEY');
  return bcrypt.compare(`${plainText}_${appKey}`, hash);
}
