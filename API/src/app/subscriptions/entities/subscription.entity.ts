import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

import { Plan } from 'src/app/plans/entities/plan.entity';
import { Student } from 'src/app/students/entities/student.entity';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paypalId: string;

  @Column({ type: 'timestamp' })
  start: string;

  @Column({ type: 'timestamp' })
  expiration: string;

  @Column({ default: true })
  status: boolean;

  @Column('integer')
  availableCredits: number;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @Transform(({ value }) => {
    const user = value.user;
    return user ? `${user.firstName} ${user.lastName}` : value;
  })
  @ManyToOne(() => Student, (student) => student.subscriptions, { eager: true })
  @JoinColumn([{ name: 'studentId', referencedColumnName: 'id' }])
  student: Student;

  @Transform(({ value }) => value.name || value)
  @ManyToOne(() => Plan, (plan) => plan.subscriptions, { eager: true })
  @JoinColumn([{ name: 'planId', referencedColumnName: 'id' }])
  plan: Plan;
}
