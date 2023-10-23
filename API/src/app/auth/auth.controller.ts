import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import { CreateStudentDto } from '../students/dto/create-student.dto';

import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createStudentDto: CreateStudentDto) {
    return this.authService.signUp(createStudentDto);
  }

  @Post('verify')
  verifyAccount(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.validateCode(email, code);
  }

  @Post('resendCode')
  resendCode(@Body('email') email: string) {
    return this.authService.resendCode(email);
  }

  @Post('signin')
  signIn(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @Get('profile/:id')
  @UseGuards(AccessTokenGuard)
  findProfile(@Param('id') id: string) {
    return this.authService.findProfile(id);
  }

  @Put('profile/update')
  @UseGuards(AccessTokenGuard)
  updateProfile(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateProfile(updateUserDto);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(@Req() req: Request) {
    const id = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(id, refreshToken);
  }
}
