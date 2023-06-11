import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nService, I18nValidationPipe } from 'nestjs-i18n';
import { HandlerFilter } from './exceptions/handler.filter';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as process from 'process';
import { join } from 'path';
import { LogService } from '@providers/services/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: new LogService(),
    });
    app.useGlobalPipes(new I18nValidationPipe());
    app.useGlobalFilters(new HandlerFilter(app.get(I18nService), app.get(ConfigService)));
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    const config = new DocumentBuilder()
        .setTitle('NestJS Demo')
        .setDescription('NestJS demo API description')
        .setVersion(process.env.APP_VERSION)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3001);
}
bootstrap();
