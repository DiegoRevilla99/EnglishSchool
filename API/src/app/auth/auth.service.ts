import * as argon2 from 'argon2';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { AuthDto } from './dto/auth.dto';
import { CreateStudentDto } from '../students/dto/create-student.dto';

import { UsersService } from '../users/users.service';
import { StudentsService } from '../students/students.service';

import { User } from '../users/entities/user.entity';
import { Student } from '../students/entities/student.entity';

import { _accessToken, _refreshToken } from 'src/utils/constants';
import { EmailsService } from 'src/third-party/emails/emails.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
    private emailsService: EmailsService,
  ) {}

  async hashInfo(data: string) {
    return await argon2.hash(data);
  }

  async compareHash(hashed: string, attempt: string) {
    return await argon2.verify(hashed, attempt);
  }

  async createUserObject(user: User, accessToken: string) {
    return Object.assign(
      {
        accessToken,
      },
      {
        user: plainToInstance(User, {
          ...user,
          ...(user.students.length === 1 && {
            studentId: user.students.at(0).id,
            level: user.students.at(0).level?.name || 'N/A',
            sessions: user.students.at(0).sessions,
            subscriptions: user.students.at(0).subscriptions,
          }),
          ...(user.teachers.length === 1 && {
            teacherId: user.teachers.at(0).id,
            level: user.teachers.at(0).levels.map((level) => level.name),
            sessions: user.teachers.at(0).sessions,
            schedule: user.teachers.at(0).schedule,
            eventualities: user.teachers.at(0).eventualities,
          }),
        }),
      },
    );
  }

  async createStudentObject(student: Student, accessToken: string) {
    return Object.assign(
      {
        accessToken,
      },
      {
        user: plainToInstance(User, {
          ...student.user,
          studentId: student.id,
          ...(student.level && { level: student.level.name }),
        }),
      },
    );
  }

  async signUp(createStudentDto: CreateStudentDto) {
    const studentExists = await this.studentsService.findOneByKeyword(
      createStudentDto.email,
    );

    if (studentExists) {
      throw new BadRequestException('Correo ya está vinculado a otra cuenta');
    }

    createStudentDto.password = await this.hashInfo(createStudentDto.password);
    const createStudent = await this.studentsService.create(createStudentDto);
    const newStudent = await this.studentsService.findOne(createStudent.id);

    const tokens = await this.getTokens(newStudent.user);
    await this.updateRefreshToken(newStudent.user.id, tokens.refreshToken);
    newStudent.user.refreshToken = tokens.refreshToken;

    this.emailsService.sendEmail(
      {
        to: newStudent.user.email,
        subject: 'Verifica tu cuenta',
        text: newStudent.user.code,
      },
      'sendCode',
    );
    return this.createStudentObject(newStudent, tokens.accessToken);
  }

  async findProfile(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.refreshToken = tokens.refreshToken;
    return this.createUserObject(user, tokens.accessToken);
  }

  async updateProfile(updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOneByKeyword(updateUserDto.email);
    if (!user) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const userUpdated = await this.usersService.update(updateUserDto);
    const tokens = await this.getTokens(userUpdated);

    await this.updateRefreshToken(userUpdated.id, tokens.refreshToken);

    userUpdated.refreshToken = tokens.refreshToken;
    return this.createUserObject(userUpdated, tokens.accessToken);
  }

  async validateCode(email: string, userCode: string) {
    const studentExists = await this.studentsService.findOneByKeyword(email);

    if (!studentExists) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    if (Number(userCode) !== Number(studentExists.user.code)) {
      throw new BadRequestException('Código incorrecto');
    }

    await this.usersService.verify(studentExists.user.id);

    const tokens = await this.getTokens(studentExists.user);
    await this.updateRefreshToken(studentExists.user.id, tokens.refreshToken);
    studentExists.user.refreshToken = tokens.refreshToken;
    studentExists.user.verified = true;

    return this.createStudentObject(studentExists, tokens.accessToken);
  }

  async resendCode(email: string) {
    const studentExists = await this.studentsService.findOneByKeyword(email);

    if (!studentExists) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const newCode = Math.floor(Math.random() * 9000 + 1000).toString();
    const userUpdated = await this.usersService.updateCode(
      studentExists.user.id,
      newCode,
    );

    this.emailsService.sendEmail(
      {
        to: studentExists.user.email,
        subject: 'Verifica tu cuenta',
        text: newCode,
      },
      'sendCode',
    );
  }

  async signIn(authDto: AuthDto) {
    const user = await this.usersService.findOneByKeyword(authDto.email);

    if (!user) {
      throw new BadRequestException('No existe cuenta con ese correo');
    }

    const passwordMatches = await this.compareHash(
      user.password,
      authDto.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Verifica tus credenciales');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.refreshToken = tokens.refreshToken;
    return this.createUserObject(user, tokens.accessToken);
  }

  async logout(id: string) {
    const resetUserToken = new User();
    resetUserToken.id = id;
    resetUserToken.refreshToken = null;

    return this.usersService.update(resetUserToken);
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.usersService.findOneById(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Acceso denegado');
    }

    const refreshTokenMatches = await this.compareHash(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Acceso denegado');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.refreshToken = tokens.refreshToken;
    return this.createUserObject(user, tokens.accessToken);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashInfo(refreshToken);
    const refreshUserToken = new User();
    refreshUserToken.id = id;
    refreshUserToken.refreshToken = hashedRefreshToken;

    await this.usersService.update(refreshUserToken);
  }

  async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role.name,
        },
        {
          secret: _accessToken,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          role: user.role.name,
        },
        {
          secret: _refreshToken,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
