import * as argon2 from 'argon2';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Level } from '../levels/entities/level.entity';

import { EmailsService } from 'src/third-party/emails/emails.service';

import { randomPassword } from 'src/utils/constants';
import { IEventuality, ISchedule } from 'src/common/types/Schedule';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private emailsService: EmailsService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const randomPwd = randomPassword(8);

    const teacherRol = new Role();
    teacherRol.name = 'PROFESOR';

    const teacherLevels = createTeacherDto.levels.map((level) => {
      const teacherLevel = new Level();
      teacherLevel.id = level;

      return teacherLevel;
    });

    const teacherUser = User.create(createTeacherDto);
    teacherUser.verified = true;
    teacherUser.role = teacherRol;
    teacherUser.password = await argon2.hash(randomPwd);

    const teacher = new Teacher();
    teacher.user = teacherUser;
    teacher.levels = teacherLevels;
    teacher.schedule = createTeacherDto.schedule;
    teacher.license = createTeacherDto.license;

    await this.emailsService.sendEmail(
      {
        to: teacherUser.email,
        subject: 'Bienvenido a Minimundo Lingua',
        text: `${teacherUser.firstName}/${randomPwd}`,
      },
      'sendPassword',
    );

    const savedTeacher = await this.teachersRepository.save(teacher);

    return this.teachersRepository.create(
      await this.teachersRepository.findOne({ where: { id: savedTeacher.id } }),
    );
  }

  async addEventuality(teacherId: string, eventuality: IEventuality) {
    const teacherExists = await this.teachersRepository.findOne({
      where: { id: teacherId },
    });

    if (!teacherExists) {
      throw new BadRequestException('No se encontró el profesor');
    }

    const eventualities = teacherExists.eventualities
      ? [...teacherExists.eventualities]
      : [];
    eventualities.push(eventuality);

    const updated = await this.teachersRepository.update(
      { id: teacherId },
      { eventualities: eventualities },
    );

    if (updated.affected === 0) {
      throw new BadRequestException('Eventualidad no agregada');
    }

    return { message: 'Eventualidad agregada' };
  }

  async findAll() {
    return await this.teachersRepository.find();
  }

  async findOne(id: string) {
    return await this.teachersRepository.findOne({ where: { id } });
  }

  async update(updateTeacherDto: UpdateTeacherDto) {
    const teacherUser = User.create(updateTeacherDto);
    teacherUser.id = updateTeacherDto.userId;

    const teacherLevels = updateTeacherDto.levels.map((level) => {
      const teacherLevel = new Level();
      teacherLevel.id = level;

      return teacherLevel;
    });

    const teacher = new Teacher();
    teacher.id = updateTeacherDto.teacherId;
    teacher.schedule = updateTeacherDto.schedule;
    teacher.license = updateTeacherDto.license;
    teacher.user = teacherUser;
    teacher.levels = teacherLevels;

    const savedTeacher = await this.teachersRepository.save(teacher);

    return this.teachersRepository.create(
      await this.teachersRepository.findOne({ where: { id: savedTeacher.id } }),
    );
  }

  async updateSchedule(teacherId: string, newSchedule: ISchedule[]) {
    const updated = await this.teachersRepository.update(
      { id: teacherId },
      { schedule: newSchedule },
    );

    if (updated.affected === 0) {
      throw new BadRequestException('Horario no actualizado');
    }

    return { message: 'Horario actualizado' };
  }

  async resetPassword(updateTeacherDto: UpdateTeacherDto) {
    const randomPwd = randomPassword(8);

    return await this.emailsService.sendEmail(
      {
        to: updateTeacherDto.email,
        subject: 'Recupera el spoteso',
        text: `${updateTeacherDto.firstName}/${randomPwd}`,
      },
      'sendPassword',
    );
  }

  async remove(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Profesor no eliminado');
    }

    return { message: 'Profesor eliminado' };
  }
}
