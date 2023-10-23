import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    return this.plansRepository.create(
      await this.plansRepository.save(createPlanDto),
    );
  }

  async findAll() {
    return await this.plansRepository.find();
  }

  async findAllActive() {
    return await this.plansRepository.find({ where: { status: true } });
  }

  async findOne(id: number) {
    return await this.plansRepository.findOne({ where: { id } });
  }

  async update(updatePlanDto: UpdatePlanDto) {
    return this.plansRepository.create(
      await this.plansRepository.save(updatePlanDto),
    );
  }

  async remove(id: number) {
    const deleted = await this.plansRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Plan no eliminado');
    }

    return { message: 'Plan eliminado' };
  }
}
