import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';

import {
  days,
  getDateFromHours,
  getHoursFromString,
} from 'src/utils/constants';

import { ScheduleBlockByDay } from 'src/common/types/Schedule';

import { ZoomService } from 'src/third-party/zoom/zoom.service';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
    private zoomService: ZoomService,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const student = await Student.findOne({
      where: { id: createSessionDto.studentId },
      relations: { level: true },
    });

    const sub = await Subscription.findOne({
      where: { student: { id: student.id }, status: true },
      relations: { student: true },
    });

    if (!sub || sub.availableCredits <= 0) {
      throw new BadRequestException('No cuentas con créditos suficientes');
    }

    const teacher = await Teacher.findOne({
      where: { id: createSessionDto.teacherId },
    });

    const lessons = await Lesson.find({
      relations: { unit: { level: true } },
      where: {
        fromSessionNumber: LessThanOrEqual(createSessionDto.sessionNumber),
        toSessionNumber: MoreThanOrEqual(createSessionDto.sessionNumber),
        unit: { level: { id: student.level.id } },
      },
    });

    const session = this.sessionsRepository.create();
    session.student = student;
    session.teacher = teacher;
    session.lessons = lessons;
    session.isFirst = createSessionDto.isFirst;
    session.duration = createSessionDto.duration;
    session.sessionDate = dayjs(createSessionDto.sessionDate).toDate();

    const { zoomMeeting, meetPwd } = await this.zoomService.createMeeting(
      session,
      teacher,
      student,
    );

    session.zoomMeetingId = zoomMeeting.id;
    session.zoomMeetingPwd = meetPwd;

    const bookedSession = await this.sessionsRepository.save(session);

    await Subscription.update(
      { id: sub.id },
      { availableCredits: createSessionDto.availableCredits - 1 },
    );

    return {
      subscriptions: Subscription.create(
        await Subscription.find({
          where: { id: sub.id },
          relations: { plan: true, student: true },
        }),
      ),
      session: this.sessionsRepository.create(
        await this.sessionsRepository.findOne({
          where: { id: bookedSession.id },
          relations: { student: true, teacher: true },
        }),
      ),
    };
  }

  async createTrial(studentId: string) {
    const teachers = await Teacher.find();
    const teacher = teachers.reduce((prev, current) =>
      +prev.sessions.length < +current.sessions.length ? prev : current,
    );

    let teacherSchedule;
    let sessionDate;

    let daysCounter = 1;
    let hoursCounter = 0;

    while (!sessionDate || daysCounter > 7) {
      const daySelected = dayjs().add(daysCounter, 'days').day();
      teacherSchedule = teacher.schedule.find((spot) => {
        return spot.day === days[daySelected];
      });

      if (!teacherSchedule) {
        daysCounter++;
        continue;
      }

      const totalHours =
        getHoursFromString(teacherSchedule.endHour) -
        getHoursFromString(teacherSchedule.startHour);

      const potentialDate = dayjs(getDateFromHours(teacherSchedule.startHour))
        .add(daysCounter, 'days')
        .add(hoursCounter, 'hours')
        .toDate();

      const sessionExists = teacher.sessions.find((session) => {
        return dayjs(session.sessionDate).isSame(dayjs(potentialDate));
      });

      if (sessionExists) {
        if (hoursCounter < totalHours - 1) {
          hoursCounter++;
        } else {
          hoursCounter = 0;
          daysCounter++;
        }
        continue;
      }

      sessionDate = dayjs(getDateFromHours(teacherSchedule.startHour))
        .add(daysCounter, 'days')
        .add(hoursCounter, 'hours')
        .toDate();
    }

    if (!sessionDate) {
      throw new BadRequestException('No hay fechas disponibles');
    }

    const student = await Student.findOne({
      where: { id: studentId },
    });

    const session = this.sessionsRepository.create({
      isFirst: true,
      duration: 60,
      student: student,
      teacher: teacher,
      sessionDate: sessionDate.toISOString(),
    });

    const { zoomMeeting, meetPwd } = await this.zoomService.createMeeting(
      session,
      teacher,
      student,
    );

    session.zoomMeetingId = zoomMeeting;
    session.zoomMeetingPwd = meetPwd;

    const bookedSession = await this.sessionsRepository.save(session);

    return this.sessionsRepository.create(
      await this.sessionsRepository.findOne({
        where: { id: bookedSession.id },
        relations: { student: true, teacher: true },
      }),
    );
  }

  async findAll() {
    return await this.sessionsRepository.find({
      relations: {
        teacher: true,
        student: true,
        lessons: true,
      },
    });
  }

  async findAllByDate(date: string) {
    return await this.sessionsRepository.find({
      where: { sessionDate: new Date(date) },
      relations: { lessons: true },
    });
  }

  async findAllByStudent(studentId: string) {
    return await this.sessionsRepository.find({
      where: { student: { id: studentId } },
      relations: {
        lessons: true,
        teacher: {
          user: true,
        },
        student: {
          user: true,
        },
      },
    });
  }

  async findAllByTeacher(teacherId: string) {
    return await this.sessionsRepository.find({
      where: { teacher: { id: teacherId } },
      relations: {
        lessons: true,
        teacher: {
          user: true,
        },
        student: {
          user: true,
        },
      },
    });
  }

  async findAllByLevel(level: string, startStr: string, endStr: string) {
    const start = dayjs(startStr);
    const end = dayjs(endStr);

    const scheduleGroupedByDay: ScheduleBlockByDay = {};

    const teachersByLevel = await Teacher.find({
      where: { levels: { name: In([level]) } },
      relations: { user: true, sessions: true, levels: true },
    });

    const teacherByDateSessions = await Teacher.createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.sessions', 'sessions')
      .leftJoinAndSelect('teacher.levels', 'levels')
      .where('levels.name IN(:...level)', { level: [level] })
      .andWhere('sessions.sessionDate >= :startDate', {
        startDate: start.toDate(),
      })
      .andWhere('sessions.sessionDate <= :endDate', {
        endDate: end.toDate(),
      })
      .getMany();

    const allSessions = await Session.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.teacher', 'teacher')
      .where('sessions.sessionDate >= :startDate', {
        startDate: start.toDate(),
      })
      .andWhere('sessions.sessionDate <= :endDate', {
        endDate: end.toDate(),
      })
      .getMany();

    const teachersSessions = teacherByDateSessions.flatMap((teacher) => {
      return { teacherId: teacher.id, sessions: teacher.sessions };
    });

    const teachersSchedules = teachersByLevel.flatMap((teacher) => {
      return teacher.schedule.map((schedule) => {
        return {
          ...schedule,
          teacher: {
            teacherId: teacher.id,
            userId: teacher.user.id,
            name: `${teacher.user.firstName} ${teacher.user.lastName}`,
          },
        };
      });
    });

    const teacherEventualities = teachersByLevel
      .flatMap((teacher) => {
        if (teacher.eventualities) {
          return teacher.eventualities.map((eventuality) => {
            return {
              ...eventuality,
              teacherId: teacher.id,
              userId: teacher.user.id,
              name: `${teacher.user.firstName} ${teacher.user.lastName}`,
            };
          });
        }
      })
      .filter((exists) => exists);

    teachersSchedules.forEach((schedule) => {
      if (!scheduleGroupedByDay[schedule.day]) {
        scheduleGroupedByDay[schedule.day] = {};
      }

      const hourPointer = getDateFromHours(schedule.startHour);
      const endHour = getDateFromHours(schedule.endHour);

      while (hourPointer < endHour) {
        const hour = hourPointer.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        if (!scheduleGroupedByDay[schedule.day][hour]) {
          scheduleGroupedByDay[schedule.day][hour] = [];
        }

        const teacherSessions = teachersSessions.find((teacher) => {
          return teacher.teacherId === schedule.teacher.teacherId;
        });

        const teacherDaySession = teacherSessions?.sessions.find((session) => {
          return (
            days[session.sessionDate.getDay()] === schedule.day &&
            session.sessionDate.getHours() === hourPointer.getHours()
          );
        });

        if (!teacherDaySession) {
          scheduleGroupedByDay[schedule.day][hour].push(schedule.teacher);
        }

        hourPointer.setHours(hourPointer.getHours() + 1);
      }
    });

    // miercoles 3-6 pm ausencia
    // jueves 4-7 pm horas extras

    teacherEventualities.forEach((eventuality) => {
      const dayHour = dayjs(eventuality.date);
      const startHour = dayjs(eventuality.startHour);
      const endHour = dayjs(eventuality.endHour);

      if (startHour.isBetween(start, end)) {
        const hourPointer = startHour.toDate();
        const finalPointer = endHour.toDate();
        const dayEventuality = days[dayHour.day()];

        while (hourPointer < finalPointer) {
          const hour = hourPointer.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          if (eventuality.type === 'Ausencia') {
            if (
              Object.keys(scheduleGroupedByDay).includes(dayEventuality) &&
              Object.keys(scheduleGroupedByDay[dayEventuality]).includes(hour)
            ) {
              const isAbsent = scheduleGroupedByDay[dayEventuality][
                hour
              ].flatMap((teachers) => {
                return teachers.teacherId;
              });

              if (isAbsent.includes(eventuality.teacherId)) {
                scheduleGroupedByDay[dayEventuality][hour] =
                  scheduleGroupedByDay[dayEventuality][hour].filter(
                    (teacher) => {
                      return teacher.teacherId !== eventuality.teacherId;
                    },
                  );
              }

              if (scheduleGroupedByDay[dayEventuality][hour].length === 0) {
                delete scheduleGroupedByDay[dayEventuality][hour];
              }
            }
          } else {
            if (!scheduleGroupedByDay[dayEventuality][hour]) {
              scheduleGroupedByDay[dayEventuality][hour] = [];
            }

            scheduleGroupedByDay[dayEventuality][hour].push({
              teacherId: eventuality.teacherId,
              userId: eventuality.userId,
              name: eventuality.name,
            });
          }

          hourPointer.setHours(hourPointer.getHours() + 1);
        }
      }
    });

    allSessions.forEach((session) => {
      const daySession = days[session.sessionDate.getDay()];
      const startHour = dayjs(session.sessionDate)
        .subtract(session.duration, 'minutes')
        .toDate()
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

      if (
        Object.keys(scheduleGroupedByDay).includes(daySession) &&
        Object.keys(scheduleGroupedByDay[daySession]).includes(startHour)
      ) {
        const isOcuppied = scheduleGroupedByDay[daySession][startHour].flatMap(
          (teachers) => {
            return teachers.teacherId;
          },
        );

        if (isOcuppied.includes(session.teacher.id)) {
          scheduleGroupedByDay[daySession][startHour] = scheduleGroupedByDay[
            daySession
          ][startHour].filter((teacher) => {
            return teacher.teacherId !== session.teacher.id;
          });
        }

        if (scheduleGroupedByDay[daySession][startHour].length === 0) {
          delete scheduleGroupedByDay[daySession][startHour];
        }
      }
    });

    return scheduleGroupedByDay;
  }

  async findAllSessionsBetweenDates(
    id: string,
    startStr: string,
    endStr: string,
  ) {
    const start = dayjs(startStr).toDate();
    const end = dayjs(endStr).toDate();

    const sessions = await this.sessionsRepository.find({
      where: [
        { sessionDate: Between(start, end) },
        { student: { id } },
        { teacher: { id } },
      ],
      relations: { teacher: true, student: true, lessons: true },
    });
    return sessions;
  }

  async update(updateSessionDto: UpdateSessionDto) {
    const student = new Student();
    student.id = updateSessionDto.studentId;

    const teacher = new Teacher();
    teacher.id = updateSessionDto.teacherId;

    const session = this.sessionsRepository.create(updateSessionDto);
    session.student = student;
    session.teacher = teacher;

    const updatedSession = await this.sessionsRepository.save(session);

    return this.sessionsRepository.create(
      await this.sessionsRepository.findOne({
        where: { id: updatedSession.id },
        relations: { student: true, teacher: true },
      }),
    );
  }

  async remove(id: number) {
    const deleted = await this.sessionsRepository.delete(id);

    if (deleted.affected === 0) {
      throw new BadRequestException('Sesión no eliminada');
    }

    return { message: 'Sesión eliminada' };
  }
}
