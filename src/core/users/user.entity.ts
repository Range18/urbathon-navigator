import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionEntity } from '../session/session.entity';
import { type Role } from '../../common/types/roles.type';
import { Report } from '../reports/entities/report.entity';
import { BaseEntity } from '../../common/base.entity';
import { CommunityServiceEntity } from '../community_services/entities/community_service.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  patronymicName?: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  role: Role;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  //If user for community service account
  @OneToOne(() => CommunityServiceEntity, (service) => service.user, {
    nullable: true,
  })
  service?: CommunityServiceEntity;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
