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
} from '@nestjs/common';

import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('units')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findAllByLevel(@Param('id') id: string) {
    return this.unitsService.findAllByLevel(+id);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  update(@Body() updateUnitDto: UpdateUnitDto) {
    return this.unitsService.update(updateUnitDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(+id);
  }
}
