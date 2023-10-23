import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from './entities/tag.entity';
import { Post } from '../posts/entities/post.entity';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Post])],
  exports: [TagsService],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
