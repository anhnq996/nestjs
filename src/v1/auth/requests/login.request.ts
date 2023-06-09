import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginRequest {
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
