import { Module } from '@nestjs/common';
import { LogService } from './services/logger.service';

@Module({
    providers: [LogService],
    exports: [LogService],
})
export class LoggerModule {}
