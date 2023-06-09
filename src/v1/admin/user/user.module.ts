import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [ConfigService, UserService],
})
export class UserModule {}
