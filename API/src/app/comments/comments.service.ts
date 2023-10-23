import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { Student } from '../students/entities/student.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';
import { DeleteCommentDto } from './dto/delete-comment.dto';

interface CustomResponse {
  comments: Comment[];
  totalReplies: number;
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create(createPostDto: CreateCommentDto) {
    const user = new User();
    user.id = createPostDto.userId;

    const parentComment = new Comment();
    parentComment.id = createPostDto.parentId;

    const post = new Post();
    post.id = createPostDto.postId;

    const comment: Comment = new Comment();
    comment.content = createPostDto.content;
    comment.user = user;
    comment.parentComment = parentComment.id;
    comment.post = post;

    const commentInserted = this.commentsRepository.create(
      await this.commentsRepository.save(comment),
    );

    return this.commentsRepository.findOne({
      where: { id: commentInserted.id },
    });
  }

  async findAll() {
    return await this.commentsRepository.find({
      relations: {
        post: true,
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({ where: { id } });
  }

  async findByPost(id: string) {
    const parentComments = await this.commentsRepository.find({
      where: {
        post: {
          id: id,
        },
        parentComment: IsNull(),
      },
    });

    const parentCommentsWithChildsCount = await Promise.all(
      parentComments.map(async (parent) => {
        const count = await this.commentsRepository.count({
          where: { parentComment: parent.id },
        });
        return { ...parent, count };
      }),
    );

    return parentCommentsWithChildsCount;
  }

  async findChildComments(id: number) {
    return await this.commentsRepository.find({
      where: {
        parentComment: id,
      },
    });
  }

  async update(updateCommentDto: UpdateCommentDto) {
    const user = new User();
    user.id = updateCommentDto.userId;

    const parentComment = new Comment();
    parentComment.id = updateCommentDto.parentId;

    const post = new Post();
    post.id = updateCommentDto.postId;

    const comment: Comment = new Comment();
    comment.content = updateCommentDto.content;
    comment.user = user;
    comment.parentComment = parentComment.id;
    comment.post = post;
    comment.id = updateCommentDto.id;

    const savedComment = await this.commentsRepository.save(comment);

    return this.commentsRepository.create(
      await this.commentsRepository.findOne({ where: { id: savedComment.id } }),
    );
  }

  async remove(id: string) {
    const deleted = await this.commentsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Comentario no eliminado');
    }

    return { message: 'Comentario eliminado' };
  }

  async removeMyComment(id: number, deleteCommentDto: DeleteCommentDto) {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (comment.user.id === deleteCommentDto.userId) {
      const deleted = await this.commentsRepository.delete(id);

      if (deleted.affected === 0) {
        throw new BadRequestException('Comentario no eliminado');
      }

      if (comment.parentComment === null) {
        await this.commentsRepository.delete({ parentComment: id });
      }

      return { message: 'Comentario eliminado' };
    } else {
      throw new BadRequestException(
        'No tienes permisos para eliminar este comentario',
      );
    }
  }
}
