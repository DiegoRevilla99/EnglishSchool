import {
  _dbDropSchema,
  _dbHost,
  _dbName,
  _dbPassword,
  _dbPort,
  _dbSync,
  _dbUser,
} from './utils/constants';
import { HttpExceptionFilter } from './utils/http-exception.filter';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { S3Module } from './third-party/s3/s3.module';
import { EmailsModule } from './third-party/emails/emails.module';
import { ZoomModule } from './third-party/zoom/zoom.module';

import { AuthModule } from './app/auth/auth.module';
import { RolesModule } from './app/roles/roles.module';
import { UsersModule } from './app/users/users.module';
import { StudentsModule } from './app/students/students.module';
import { TeachersModule } from './app/teachers/teachers.module';

import { PlansModule } from './app/plans/plans.module';
import { SubscriptionsModule } from './app/subscriptions/subscriptions.module';

import { LevelsModule } from './app/levels/levels.module';
import { UnitsModule } from './app/units/units.module';
import { LessonsModule } from './app/lessons/lessons.module';
import { SessionsModule } from './app/sessions/sessions.module';

import { PostsModule } from './app/posts/posts.module';
import { CommentsModule } from './app/comments/comments.module';
import { TagsModule } from './app/tags/tags.module';

@Module({
  imports: [
    AuthModule,
    RolesModule,
    UsersModule,
    StudentsModule,
    TeachersModule,
    PlansModule,
    SubscriptionsModule,
    SessionsModule,
    LevelsModule,
    UnitsModule,
    LessonsModule,
    PostsModule,
    CommentsModule,
    TagsModule,
    S3Module,
    EmailsModule,
    ZoomModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: _dbHost,
      port: _dbPort,
      username: _dbUser,
      password: _dbPassword,
      database: _dbName,
      synchronize: _dbSync,
      dropSchema: _dbDropSchema,
      autoLoadEntities: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {}
