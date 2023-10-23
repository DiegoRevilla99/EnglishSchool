import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from 'src/app/posts/entities/post.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable({ name: 'posts_tags' })
  posts: Post[];
}
