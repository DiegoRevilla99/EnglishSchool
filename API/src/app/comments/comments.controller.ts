import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { CommentsService } from './comments.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Public()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @Roles('ADMINISTRADOR')
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('/post/:id')
  @Public()
  findByPost(@Param('id') id: string) {
    return this.commentsService.findByPost(id);
  }

  @Get('/childComments/:id')
  @Public()
  findChildComments(@Param('id') id: number) {
    return this.commentsService.findChildComments(id);
  }

  @Get(':id')
  @Roles('ADMINISTRADOR')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Put()
  @Roles('ADMINISTRADOR', 'ESTUDIANTE', 'PROFESOR', 'COORDINADOR')
  update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }

  @Delete('/removeMyComment/:id')
  @Roles('ADMINISTRADOR', 'ESTUDIANTE', 'PROFESOR', 'COORDINADOR')
  removeMyComment(
    @Param('id') id: number,
    @Body() deleteCommentDto: DeleteCommentDto,
  ) {
    return this.commentsService.removeMyComment(id, deleteCommentDto);
  }
}
