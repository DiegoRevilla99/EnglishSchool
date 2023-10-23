import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';

import { TeachersService } from './teachers.service';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { IEventuality, ISchedule } from 'src/common/types/Schedule';

@Controller('teachers')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Post('eventuality')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'PROFESOR')
  addEventuality(
    @Body('id') teacherId: string,
    @Body('eventuality') eventuality: IEventuality,
  ) {
    return this.teachersService.addEventuality(teacherId, eventuality);
  }

  @Get()
  @Public()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  update(@Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(updateTeacherDto);
  }

  @Put('schedule')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR', 'PROFESOR')
  updateSchedule(
    @Body('id') teacherId: string,
    @Body('schedule') schedule: ISchedule[],
  ) {
    return this.teachersService.updateSchedule(teacherId, schedule);
  }

  @Put('/reset')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  resetPassword(@Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.resetPassword(updateTeacherDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
