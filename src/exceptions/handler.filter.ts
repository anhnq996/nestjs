import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';

@Catch(I18nValidationException)
export class HandlerFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: I18nValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.BAD_REQUEST;
    const validationErrors = exception.errors;
    let errorMessages = {};
    
    await Promise.all(
      Object.values(validationErrors).map(async (error: any) => {
        const constraints = Object.values(error.constraints);
        errorMessages[error.property] = await Promise.all(constraints.map(async (constraint: string) => await constraint));
      }),
    );

    console.log(errorMessages);

    response.status(statusCode).json({
      statusCode,
      message: 'Validation failed',
      errors: errorMessages,
    });
  }
}