import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  UpdateDateColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';
import { Post } from 'src/app/posts/entities/post.entity';
import { User } from 'src/app/users/entities/user.entity';

@Entity('comments')
@Tree('adjacency-list')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Transform(({ value }) => {
    return value.id ? { id: value.id } : value;
  })
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Post;

  @Column({ nullable: true })
  parentComment: number;

  @Transform(({ value }) => {
    return value
      ? { id: value.id, firstName: value.firstName, lastName: value.lastName }
      : value;
  })
  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
