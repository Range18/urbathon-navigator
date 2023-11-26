import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { UserEntity } from '../../users/user.entity';
import { NewsEntity } from '../../news/entities/news.entity';
import { postType } from '../types/post.type';

@Entity('community_services')
export class CommunityServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: string;

  @OneToOne(() => UserEntity, (user) => user.service, { nullable: false })
  @JoinColumn({ name: 'userUUID' })
  user: UserEntity;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  type: postType;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @OneToMany(() => NewsEntity, (news) => news.service, { nullable: true })
  news?: NewsEntity[];
}
