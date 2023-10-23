import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

import { Role } from 'src/app/roles/entities/role.entity';
import { Student } from 'src/app/students/entities/student.entity';
import { Teacher } from 'src/app/teachers/entities/teacher.entity';
import { Comment } from 'src/app/comments/entities/comment.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ default: false })
  verified: boolean;

  @Exclude()
  @Column({ nullable: true, length: 4 })
  code: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @Exclude()
  @OneToMany(() => Student, (student) => student.user, { cascade: ['remove'] })
  students: Student[];

  @Exclude()
  @OneToMany(() => Teacher, (teacher) => teacher.user, { cascade: ['remove'] })
  teachers: Teacher[];

  @Transform(({ value }) => value.name || value)
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn([{ name: 'role', referencedColumnName: 'name' }])
  role: Role;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
