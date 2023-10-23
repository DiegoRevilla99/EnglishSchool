import * as argon2 from 'argon2';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Level } from '../levels/entities/level.entity';

import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { randomPassword } from 'src/utils/constants';

import { EmailsService } from 'src/third-party/emails/emails.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private emailsService: EmailsService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const studentRol = new Role();
    studentRol.name = 'ESTUDIANTE';

    const studentUser = User.create(createStudentDto);
    studentUser.verified = false;
    studentUser.role = studentRol;
    studentUser.code = Math.floor(Math.random() * 9000 + 1000).toString();

    if (!createStudentDto.password) {
      const randomPwd = randomPassword(8);
      studentUser.password = await argon2.hash(randomPwd);
      await this.emailsService.sendEmail(
        {
          to: studentUser.email,
          subject: 'Bienvenido a Minimundo Lingua',
          text: `${studentUser.firstName}/${randomPwd}`,
        },
        'sendPassword',
      );
    } else if (!createStudentDto.password.includes('$argon2id')) {
      studentUser.password = await argon2.hash(createStudentDto.password);
    }

    const student = new Student();
    student.user = studentUser;

    if (createStudentDto.level) {
      const studentLevel = new Level();
      studentLevel.name = createStudentDto.level;
      student.level = studentLevel;
    }

    return this.studentsRepository.create(
      await this.studentsRepository.save(student),
    );
  }

  async findAll() {
    return await this.studentsRepository.find();
  }

  async findOne(id: string) {
    return await this.studentsRepository.findOne({
      where: { id },
      relations: { level: true, user: true },
    });
  }

  async findOneByKeyword(keyword: string) {
    return await this.studentsRepository.findOne({
      where: { user: { email: ILike(`%${keyword}%`) } },
    });
  }

  async update(updateStudentDto: UpdateStudentDto) {
    const studentUser = User.create(updateStudentDto);
    studentUser.id = updateStudentDto.userId;

    const student = new Student();
    student.id = updateStudentDto.studentId;
    student.user = studentUser;

    if (updateStudentDto.level) {
      const studentLevel = new Level();
      studentLevel.name = updateStudentDto.level;
      student.level = studentLevel;
    }

    return this.studentsRepository.create(
      await this.studentsRepository.save(student),
    );
  }

  async resetPassword(updateStudentDto: UpdateStudentDto) {
    const randomPwd = randomPassword(8);

    return await this.emailsService.sendEmail(
      {
        to: updateStudentDto.email,
        subject: 'Recupera el acceso',
        text: `${updateStudentDto.firstName}/${randomPwd}`,
      },
      'sendPassword',
    );
  }

  async remove(id: string) {
    const deleted = await this.usersRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Estudiante no eliminado');
    }

    return { message: 'Estudiante eliminado' };
  }
}
