import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZoomModule } from 'src/third-party/zoom/zoom.module';

import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), ZoomModule],
  exports: [SessionsService],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
