import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { isNotEmpty } from 'class-validator';

@Catch(I18nValidationException)
export class HandlerFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async transformError(constraint, lang) {
    const message = constraint.split('|');
    let args = {};
    if (isNotEmpty(message[1])) {
      args = JSON.parse(message[1]);
      Object.keys(args).map(async (key) => {
        args[key] = args[key].includes('attribute.')
          ? this.i18n.t(args[key], { lang })
          : args[key];
      });
    }
    return this.i18n.t(message[0], { args: args, lang });
  }
  async catch(exception: I18nValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = request.header('lang');
    const statusCode = HttpStatus.BAD_REQUEST;
    const validationErrors = exception.errors;
    const errorMessages = {};

    await Promise.all(
      Object.values(validationErrors).map(async (error: any) => {
        const constraints = Object.values(error.constraints);
        errorMessages[error.property] = await Promise.all(
          constraints.map(
            async (constraint: string) =>
              await this.transformError(constraint, lang),
          ),
        );
      }),
    );

    const code = 'E1001';
    response.status(statusCode).json({
      code: code,
      message: this.i18n.t(`response.${code}`),
      errors: errorMessages,
    });
  }
}
