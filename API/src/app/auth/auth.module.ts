import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { StudentsModule } from '../students/students.module';
import { EmailsModule } from 'src/third-party/emails/emails.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AccessTokenStrategy } from './strategies/accessToken.strategy.ts';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { _accessToken, _refreshToken } from 'src/utils/constants';

@Module({
  imports: [UsersModule, StudentsModule, EmailsModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
