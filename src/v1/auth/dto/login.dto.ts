// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @IsNotEmpty({
    message: i18nValidationMessage('validation.required', {
      attribute: 'attribute.username',
    }),
  })
  username: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.required', {
      attribute: 'attribute.password',
    }),
  })
  password: string;
}
