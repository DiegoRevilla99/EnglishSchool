import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { FileType } from 'src/common/types/Lesson';

import { Unit } from 'src/app/units/entities/unit.entity';
import { Session } from 'src/app/sessions/entities/session.entity';

@Entity('lessons')
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  teacherNotes: string;

  @Column({ type: 'text' })
  studentNotes: string;

  @Column('jsonb', { nullable: true })
  teacherFiles?: FileType[];

  @Column('jsonb', { nullable: true })
  teacherLinks?: string[];

  @Column('jsonb', { nullable: true })
  studentFiles?: FileType[];

  @Column('jsonb', { nullable: true })
  studentLinks?: string[];

  @Column('integer', { default: 1 })
  fromSessionNumber?: number;

  @Column('integer', { default: 1 })
  toSessionNumber?: number;

  @Transform(({ value }) => value.id || value)
  @ManyToOne(() => Unit, (unit) => unit.lessons, { eager: true })
  @JoinColumn([{ name: 'unit', referencedColumnName: 'id' }])
  unit: Unit;

  @ManyToMany(() => Session, (session) => session.lessons)
  @JoinTable({ name: 'sessions_lessons' })
  sessions: Session[];
}
