// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';

export class LoginDto {
  constructor(private readonly i18n: I18nService) {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @IsNotEmpty({ message: this.i18n.t('validation.NOT_EMPTY') })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
