import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

import { Plan } from '../plans/entities/plan.entity';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const student = new Student();
    student.id = createSubscriptionDto.studentId;

    const plan = new Plan();
    plan.id = createSubscriptionDto.planId;

    const subscription = new Subscription();
    subscription.student = student;
    subscription.plan = plan;
    subscription.paypalId = createSubscriptionDto.paypalId;
    subscription.start = createSubscriptionDto.start;
    subscription.expiration = createSubscriptionDto.expiration;
    subscription.status = createSubscriptionDto.status;

    const sub = await this.subscriptionsRepository.save(subscription);

    return this.subscriptionsRepository.create(
      await this.subscriptionsRepository.findOne({ where: { id: sub.id } }),
    );
  }

  async findAll() {
    return await this.subscriptionsRepository.find();
  }

  async findAllByStudent(id: string) {
    return await this.subscriptionsRepository.find({
      where: { student: { id } },
    });
  }

  async findOne(id: string) {
    return await this.subscriptionsRepository.findOne({
      where: { id },
    });
  }

  async update(updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsRepository.create(
      await this.subscriptionsRepository.save(updateSubscriptionDto),
    );
  }

  async renewal(id: string, renewalDate: string) {
    const renewed = await this.subscriptionsRepository.update(
      { student: { id } },
      { expiration: renewalDate },
    );

    if (renewed.affected === 0) {
      throw new BadRequestException('La renovación falló');
    }

    return { message: 'Renovado' };
  }

  async cancel(id: string) {
    const deleted = await this.subscriptionsRepository.update(
      { student: { id } },
      { status: false },
    );

    if (deleted.affected === 0) {
      throw new BadRequestException('La desuscripción falló');
    }

    return { message: 'Desuscrito' };
  }

  async remove(id: number) {
    const deleted = await this.subscriptionsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('No se pudo eliminar');
    }

    return { message: 'Eliminado' };
  }
}
