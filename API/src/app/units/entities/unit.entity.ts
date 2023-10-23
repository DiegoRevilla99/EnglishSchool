import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

import { Level } from 'src/app/levels/entities/level.entity';
import { Lesson } from 'src/app/lessons/entities/lesson.entity';

@Entity('units')
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Transform(({ value }) => value.name || value)
  @ManyToOne(() => Level, (level) => level.units, { eager: true })
  @JoinColumn([{ name: 'level', referencedColumnName: 'name' }])
  level: Level;

  @OneToMany(() => Lesson, (lesson) => lesson.unit, { cascade: ['insert'] })
  lessons: Lesson[];
}
