import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { UserEntity } from '../../users/user.entity';

@Entity('community_services')
export class CommunityServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: string;

  @OneToOne(() => UserEntity, (user) => user.service, { nullable: false })
  @JoinColumn({ name: 'userUUID' })
  user: UserEntity;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string; //Todo Typings

  @Column({
    type: 'longtext',
    nullable: true,
  })
  description?: string;
}
