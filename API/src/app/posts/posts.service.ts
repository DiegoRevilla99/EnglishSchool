import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { Tag } from '../tags/entities/tag.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const postTags = createPostDto.tags.map((tag) => {
      const postTag = new Tag();
      postTag.id = tag;
      return postTag;
    });

    const post: Post = new Post();
    post.tags = postTags;
    post.title = createPostDto.title;
    post.body = createPostDto.body;
    post.mainImage = createPostDto.mainImage;
    post.gallery = createPostDto.gallery;

    return this.postsRepository.create(await this.postsRepository.save(post));
  }

  async findAll() {
    return await this.postsRepository.find({});
  }

  async findOne(id: string) {
    return await this.postsRepository.findOne({
      where: { id },
    });
  }

  async findPostsByPage(page: number) {
    const postsPerPage = 5;
    const offset = (page - 1) * postsPerPage;

    return await this.postsRepository.findAndCount({
      skip: offset,
      take: postsPerPage,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findTotalPosts() {
    return await this.postsRepository.count();
  }

  async update(updatePostDto: UpdatePostDto) {
    const postTags = updatePostDto.tags.map((tag) => {
      const postTag = new Tag();
      postTag.id = tag;
      return postTag;
    });

    const post: Post = new Post();
    post.tags = postTags;
    post.title = updatePostDto.title;
    post.body = updatePostDto.body;
    post.mainImage = updatePostDto.mainImage;
    post.gallery = updatePostDto.gallery;
    post.id = updatePostDto.id;

    const savedPost = await this.postsRepository.save(post);

    return this.postsRepository.create(
      await this.postsRepository.findOne({ where: { id: savedPost.id } }),
    );
  }

  async remove(id: string) {
    const deleted = await this.postsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Post no eliminado');
    }

    return { message: 'Post eliminado' };
  }
}
