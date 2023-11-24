import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { NewsEntity } from '../../news/entities/news.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @Column({ nullable: false })
  filename: string;

  @Column({ nullable: false, default: 'untitled' })
  originalName: string;

  @Column({ nullable: false })
  mimetype: string;

  @Column({ nullable: false, default: 0 })
  size: number;

  @ManyToOne(() => NewsEntity, (news) => news.files, { nullable: true })
  @JoinColumn({ name: 'news' })
  news?: NewsEntity;
}
