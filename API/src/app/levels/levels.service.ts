import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Level } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelsRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto) {
    return this.levelsRepository.create(
      await this.levelsRepository.save(createLevelDto),
    );
  }

  async findAll() {
    return await this.levelsRepository.find();
  }

  async findOne(id: number) {
    return await this.levelsRepository.findOne({ where: { id } });
  }

  async update(updateLevelDto: UpdateLevelDto) {
    return this.levelsRepository.create(
      await this.levelsRepository.save(updateLevelDto),
    );
  }

  async remove(id: number) {
    const deleted = await this.levelsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Nivel no eliminado');
    }

    return { message: 'Nivel eliminado' };
  }
}
