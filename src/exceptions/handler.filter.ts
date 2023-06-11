import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { isNotEmpty } from 'class-validator';
import { ConfigService } from '@nestjs/config';

@Catch()
export class HandlerFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService, private readonly configService: ConfigService) {}

    async transformError(constraint, lang) {
        const message = constraint.split('|');
        let args = {};
        if (isNotEmpty(message[1])) {
            args = JSON.parse(message[1]);
            Object.keys(args).map(async (key) => {
                args[key] = args[key].includes('attribute.') ? this.i18n.t(args[key], { lang }) : args[key];
            });
        }
        return this.i18n.t(message[0], { args: args, lang });
    }
    async catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const lang = request.header('lang');
        let errorMessages = null;
        let code = 'E1001';
        let statusCode = HttpStatus.BAD_REQUEST;
        console.log(exception);
        if (exception instanceof I18nValidationException) {
            const validationErrors = exception.errors;
            errorMessages = {};
            await Promise.all(
                Object.values(validationErrors).map(async (error: any) => {
                    const constraints = Object.values(error.constraints);
                    errorMessages[error.property] = await Promise.all(
                        constraints.map(async (constraint: string) => await this.transformError(constraint, lang)),
                    );
                }),
            );
        } else if (exception instanceof UnauthorizedException) {
            code = 'E1003';
            statusCode = HttpStatus.UNAUTHORIZED;
        }

        response.status(statusCode).json({
            code: code,
            message: this.i18n.t(`response.${code}`),
            errors: errorMessages,
            debug: this.configService.get('APP_DEBUG') ? exception.message : null,
        });
    }
}
