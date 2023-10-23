import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import { Student } from 'src/app/students/entities/student.entity';
import { Teacher } from 'src/app/teachers/entities/teacher.entity';
import { Transform } from 'class-transformer';
import { Lesson } from 'src/app/lessons/entities/lesson.entity';

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @Column({ type: 'timestamp with time zone' })
  sessionDate: Date;

  @Column({ default: false })
  isFirst: boolean;

  @Column()
  zoomMeetingId: string;

  @Column()
  zoomMeetingPwd: string;

  @Transform(({ value }) => {
    return {
      studentId: value.id,
      userId: value.user.id,
      name: `${value.user.firstName} ${value.user.lastName}`,
    };
  })
  @ManyToOne(() => Student, (student) => student.sessions)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Transform(({ value }) => {
    return {
      teacherId: value.id,
      userId: value.user.id,
      name: `${value.user.firstName} ${value.user.lastName}`,
      email: value.user.email,
    };
  })
  @ManyToOne(() => Teacher, (teacher) => teacher.sessions)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Transform(({ value }) => value)
  @ManyToMany(() => Lesson, (lesson) => lesson.sessions, { eager: true })
  lessons: Lesson[];
}
