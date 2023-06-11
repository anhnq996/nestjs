import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { format, transports } from 'winston';

@Injectable()
export class LogService implements LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            format: format.combine(format.timestamp(), format.json()),
            transports: [
                new transports.Console(), // Log to the console
            ],
        });
    }

    log(message: string, context?: string) {
        const logFileName = context ? `${context.toLowerCase()}.log` : 'default.log';
        this.logger.add(new transports.File({ filename: `logs/${logFileName}` }));
        this.logger.info(message);
    }

    error(message: string, trace: string, context?: string) {
        const logFileName = context ? `${context.toLowerCase()}.log` : 'default.log';
        this.logger.add(new transports.File({ filename: `logs/${logFileName}` }));
        this.logger.error(message, { trace });
    }

    warn(message: string, context?: string) {
        const logFileName = context ? `${context.toLowerCase()}.log` : 'default.log';
        this.logger.add(new transports.File({ filename: `logs/${logFileName}` }));
        this.logger.warn(message);
    }

    debug(message: string, context?: string) {
        const logFileName = context ? `${context.toLowerCase()}.log` : 'default.log';
        this.logger.add(new transports.File({ filename: `logs/${logFileName}` }));
        this.logger.debug(message);
    }

    verbose(message: string, context?: string) {
        const logFileName = context ? `${context.toLowerCase()}.log` : 'default.log';
        this.logger.add(new transports.File({ filename: `logs/${logFileName}` }));
        this.logger.verbose(message);
    }
}
