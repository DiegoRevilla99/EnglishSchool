import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';
import { Comment } from 'src/app/comments/entities/comment.entity';
import { Tag } from 'src/app/tags/entities/tag.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar' })
  mainImage: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  gallery: string[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Transform(({ value }) => {
    return value.name ? { name: value.name } : value;
  })
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
    orphanedRowAction: 'delete',
  })
  tags: Tag[];
}
