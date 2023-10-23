import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Unit } from '../units/entities/unit.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const { unit, ...dataLesson } = createLessonDto;
    const lesson = this.lessonsRepository.create(dataLesson);

    const unitLesson = new Unit();
    unitLesson.id = unit;
    lesson.unit = unitLesson;

    return this.lessonsRepository.create(
      await this.lessonsRepository.save(lesson),
    );
  }

  async findAll() {
    return await this.lessonsRepository.find();
  }

  async findAllByUnit(id: number) {
    return await this.lessonsRepository.find({ where: { unit: { id } } });
  }

  async update(updateLessonDto: UpdateLessonDto) {
    const { unit, ...dataLesson } = updateLessonDto;
    const lesson = this.lessonsRepository.create(dataLesson);

    const unitLesson = new Unit();
    unitLesson.id = unit;
    lesson.unit = unitLesson;

    return this.lessonsRepository.create(
      await this.lessonsRepository.save(lesson),
    );
  }

  async remove(id: number) {
    const deleted = await this.lessonsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Lección no eliminada');
    }

    return { message: 'Lección eliminada' };
  }
}
