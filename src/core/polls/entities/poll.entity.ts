import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { NewsEntity } from '../../news/entities/news.entity';

export type Option = { [key in string]: string[] };

@Entity()
export class PollEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'json', nullable: false })
  options: Option;

  @ManyToOne(() => NewsEntity, (news) => news.polls, { nullable: false })
  @JoinColumn({ name: 'postId' })
  post: NewsEntity;
}
