import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';

import { EmailsModule } from 'src/third-party/emails/emails.module';

import { User } from '../users/entities/user.entity';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User, Comment]), EmailsModule],
  exports: [StudentsService],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
