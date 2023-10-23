import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { User } from 'src/app/users/entities/user.entity';
import { Level } from 'src/app/levels/entities/level.entity';
import { Session } from 'src/app/sessions/entities/session.entity';
import { Transform } from 'class-transformer';

import { IEventuality, ISchedule } from 'src/common/types/Schedule';

@Entity('teachers')
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  license: string;

  @Column({ nullable: true, type: 'jsonb' })
  schedule: ISchedule[];

  @Column({ nullable: true, type: 'jsonb' })
  eventualities: IEventuality[];

  @ManyToOne(() => User, (user) => user, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;

  @Transform(({ value }) => value)
  @ManyToMany(() => Level, (level) => level.teachers, { eager: true })
  levels: Level[];

  @OneToMany(() => Session, (session) => session.teacher, { eager: true })
  sessions: Session[];
}
