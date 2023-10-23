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

import { PostsService } from './posts.service';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles('ADMINISTRADOR')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('count')
  @Public()
  count() {
    return this.postsService.findTotalPosts();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('/page/:page')
  @Public()
  findPostsByPage(@Param('page') page: number) {
    return this.postsService.findPostsByPage(page);
  }

  @Put()
  @Roles('ADMINISTRADOR')
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(updatePostDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
