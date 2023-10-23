import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';

import { SessionsService } from './sessions.service';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('sessions')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Post('/trial')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  createTrial(@Body('studentId') studentId: string) {
    return this.sessionsService.createTrial(studentId);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get('student/:id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  findAllByStudent(@Param('id') id: string) {
    return this.sessionsService.findAllByStudent(id);
  }

  @Get('teacher/:id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'PROFESOR')
  findAllByTeacher(@Param('id') id: string) {
    return this.sessionsService.findAllByTeacher(id);
  }

  @Get('level')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  findAllByLevel(
    @Query('level') level: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.sessionsService.findAllByLevel(level, start, end);
  }

  @Get('schedule')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE', 'PROFESOR')
  findAllSessionsBetweenDates(
    @Query('id') id: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.sessionsService.findAllSessionsBetweenDates(id, start, end);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  update(@Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(updateSessionDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'ESTUDIANTE')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
