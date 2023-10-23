import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { LessonsService } from './lessons.service';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('lessons')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('/unit/:id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findAllByUnit(@Param('id') id: string) {
    return this.lessonsService.findAllByUnit(+id);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  update(@Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(updateLessonDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
