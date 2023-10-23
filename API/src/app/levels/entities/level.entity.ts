import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Student } from 'src/app/students/entities/student.entity';
import { Teacher } from 'src/app/teachers/entities/teacher.entity';
import { Unit } from 'src/app/units/entities/unit.entity';

@Entity('levels')
export class Level extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Unit, (unit) => unit.level)
  units: Unit[];

  @OneToMany(() => Student, (student) => student)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.levels)
  @JoinTable({ name: 'teachers_levels' })
  teachers: Teacher[];
}
