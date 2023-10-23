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
} from '@nestjs/common';
import { PlansService } from './plans.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('plans')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @Roles('ADMINISTRADOR')
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  @Roles('ADMINISTRADOR')
  findAll() {
    return this.plansService.findAll();
  }

  @Get('/active')
  // @Roles('ADMINISTRADOR', 'ESTUDIANTE')
  @Public()
  findAllActive() {
    return this.plansService.findAllActive();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(+id);
  }

  @Put()
  @Roles('ADMINISTRADOR')
  update(@Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(updatePlanDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.plansService.remove(+id);
  }
}
