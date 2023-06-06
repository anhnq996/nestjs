import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/User.entity';
import {
  I18nModule,
  AcceptLanguageResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { roles } from './app.roles';
import { AccessControlModule } from 'nest-access-control';

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '.env'),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: {
        path: join(__dirname, 'i18n'),
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: new ConfigService().get('DB_HOST'),
      port: new ConfigService().get('DB_PORT'),
      username: new ConfigService().get('DB_USERNAME'),
      password: new ConfigService().get('DB_PASSWORD'),
      database: new ConfigService().get('DB_DATABASE'),
      models: [User],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
