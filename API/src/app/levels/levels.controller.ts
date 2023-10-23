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
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('levels')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findAll() {
    return this.levelsService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  findOne(@Param('id') id: string) {
    return this.levelsService.findOne(+id);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  update(@Body() updateLevelDto: UpdateLevelDto) {
    return this.levelsService.update(updateLevelDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'CEO', 'COORDINADOR')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(+id);
  }
}
