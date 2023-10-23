import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    return this.unitsRepository.create(
      await this.unitsRepository.save(createUnitDto),
    );
  }

  async findAll() {
    return await this.unitsRepository.find();
  }

  async findAllByLevel(id: number) {
    return await this.unitsRepository.find({ where: { level: { id } } });
  }

  async update(updateUnitDto: UpdateUnitDto) {
    return this.unitsRepository.create(
      await this.unitsRepository.save(updateUnitDto),
    );
  }

  async remove(id: number) {
    const deleted = await this.unitsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Unidad no eliminada');
    }

    return { message: 'Unidad eliminada' };
  }
}
