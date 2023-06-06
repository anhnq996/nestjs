import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nService, I18nValidationPipe } from 'nestjs-i18n';
import { HandlerFilter } from './exceptions/handler.filter';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new HandlerFilter(app.get(I18nService)));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(3001);
}
bootstrap();
