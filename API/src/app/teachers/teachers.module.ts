import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Teacher } from './entities/teacher.entity';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';

import { User } from '../users/entities/user.entity';

import { EmailsModule } from 'src/third-party/emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, User]), EmailsModule],
  exports: [TeachersService],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
