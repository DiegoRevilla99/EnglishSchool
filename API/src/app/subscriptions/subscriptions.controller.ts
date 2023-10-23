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

import { SubscriptionsService } from './subscriptions.service';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('subscriptions')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'ESTUDIANTE')
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @Roles('ADMINISTRADOR')
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get('/student/:id')
  @Roles('ADMINISTRADOR', 'ESTUDIANTE')
  findAllByStudent(@Param('id') id: string) {
    return this.subscriptionsService.findAllByStudent(id);
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'ESTUDIANTE')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @Put()
  @Roles('ADMINISTRADOR')
  update(@Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsService.update(updateSubscriptionDto);
  }

  @Put('/renewal/:id')
  @Roles('ADMINISTRADOR', 'ESTUDIANTE')
  renowal(@Param('id') id: string, @Body('renewalDate') renewalDate: string) {
    return this.subscriptionsService.renewal(id, renewalDate);
  }

  @Put('/unsubscribe/:id')
  @Roles('ADMINISTRADOR', 'ESTUDIANTE')
  cancel(@Param('id') id: string) {
    return this.subscriptionsService.cancel(id);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(+id);
  }
}
