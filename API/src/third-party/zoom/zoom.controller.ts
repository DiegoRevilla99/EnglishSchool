import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
  HttpStatus,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { ZoomService } from './zoom.service';
import { ZoomRequest } from './entities/zoom.entity';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('zoom')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class ZoomController {
  private readonly logger = new Logger('Zoom');
  constructor(private readonly zoomService: ZoomService) {}

  @Post('/getToken')
  @Roles('ADMINISTRADOR', 'COORDINADOR', 'PROFESOR', 'ESTUDIANTE')
  getToken(@Res() response) {
    this.zoomService
      .getAccessToken()
      .then((res) => {
        this.logger.warn('Token para hacer peticiones a Zoom creado.');
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        this.logger.error('No se pudo generar el token.');
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }

  @Post('/getSignature')
  @Roles('ADMINISTRADOR', 'COORDINADOR', 'PROFESOR', 'ESTUDIANTE')
  getSignature(@Body() request: ZoomRequest, @Res() response) {
    this.zoomService
      .getSignature(request)
      .then((res) => {
        this.logger.warn('Firma para entrar a Zoom creado.');
        response.status(HttpStatus.CREATED).json({ signature: res });
      })
      .catch((err) => {
        this.logger.error('No se pudo generar la firma.');
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
