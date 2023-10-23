import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../comments/entities/comment.entity';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
