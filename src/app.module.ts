import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '@models/User.model';
import { I18nModule, AcceptLanguageResolver, HeaderResolver } from 'nestjs-i18n';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './v1/admin/user/user.module';
import { UserHasRoleModel } from '@models/UserHasRole.model';
import { RoleModel } from '@models/Role.model';
import { PermissionModel } from '@models/Permission.model';
import { RequestLoggerMiddleware } from './providers/middlewares/request-logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: join(__dirname, '..', '.env'),
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'vi',
            loaderOptions: {
                path: join(__dirname, 'i18n'),
                watch: true,
            },
            resolvers: [{ use: HeaderResolver, options: ['lang'] }, AcceptLanguageResolver],
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: new ConfigService().get('DB_HOST'),
            port: new ConfigService().get('DB_PORT'),
            username: new ConfigService().get('DB_USERNAME'),
            password: new ConfigService().get('DB_PASSWORD'),
            database: new ConfigService().get('DB_DATABASE'),
            models: [UserModel, UserHasRoleModel, RoleModel, PermissionModel],
        }),
        JwtModule.register({
            global: true,
            secret: new ConfigService().get('JWT_SECRET'),
            signOptions: { expiresIn: new ConfigService().get('JWT_EXPIRES') },
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
