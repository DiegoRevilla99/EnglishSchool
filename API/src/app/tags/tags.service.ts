import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.findOne({
      where: { name: createTagDto.name },
    });

    if (tag) {
      throw new BadRequestException('Ya existe un tag con ese nombre');
    }

    return this.tagRepository.create(
      await this.tagRepository.save(createTagDto),
    );
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: number) {
    return await this.tagRepository.findOne({ where: { id } });
  }

  async update(updateTagDto: UpdateTagDto) {
    return await this.tagRepository.save(updateTagDto);
  }

  async remove(id: number) {
    const deleted = await this.tagRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Tag no eliminado');
    }

    return { message: 'Tag eliminado' };
  }
}
