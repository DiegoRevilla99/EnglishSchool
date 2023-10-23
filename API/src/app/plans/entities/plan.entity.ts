import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Double,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Subscription } from 'src/app/subscriptions/entities/subscription.entity';

@Entity('plans')
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  description: string;

  @Column('double precision')
  price: Double;

  @Column('integer')
  credits: number;

  @Column({ unique: true })
  paypalId: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
