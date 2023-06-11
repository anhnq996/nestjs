import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../repositories/User.repository';
import { UserModel } from '@models/User.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from '../../app.service';
import { UserHasRoleModel } from '@models/UserHasRole.model';
import { LoggerModule } from '../../providers/logger.provider';

@Module({
    imports: [SequelizeModule.forFeature([UserModel, UserHasRoleModel]), LoggerModule],
    controllers: [AuthController],
    providers: [ConfigService, UserRepository, AuthService, AppService],
})
export class AuthModule {}
