import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../services/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new LogService();

    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            const body = req.body;
            Object.keys(body).map((key) => {
                if (key.includes('password') || key == 'pass') body[key] = '******';
            });
            const content = {
                method: req.method,
                path: req.url,
                body: body,
                headers: req.headers,
                responseCode: res.statusCode,
                // responseBody: res.json,
            };
            this.logger.log(JSON.stringify(content), 'request');
        });

        next();
    }
}
