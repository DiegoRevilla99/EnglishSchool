import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/app/users/entities/user.entity';
import { Subscription } from 'src/app/subscriptions/entities/subscription.entity';
import { Level } from 'src/app/levels/entities/level.entity';
import { Session } from 'src/app/sessions/entities/session.entity';
import { Transform } from 'class-transformer';

@Entity('students')
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.students, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;

  @OneToMany(() => Subscription, (subscription) => subscription.student)
  subscriptions: Subscription[];

  @OneToMany(() => Session, (session) => session.student, { eager: true })
  sessions: Session[];

  @Transform(({ value }) => (value ? value.name || value : 'N/A'))
  @ManyToOne(() => Level, (level) => level.students, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'level', referencedColumnName: 'name' }])
  level: Level;
}
