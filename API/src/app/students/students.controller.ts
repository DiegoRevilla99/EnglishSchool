import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { StudentsService } from './students.service';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(updateStudentDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
