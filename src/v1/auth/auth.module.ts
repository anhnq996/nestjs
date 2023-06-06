import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../repositories/User.repository';
import { User } from '../../models/User.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from '../../app.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [ConfigService, UserRepository, AuthService, AppService],
})
export class AuthModule {}
