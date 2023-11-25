import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { FileEntity } from '../../storage/entity/file.entity';
import { CommunityServiceEntity } from '../../community_services/entities/community_service.entity';

@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @OneToOne(() => CommunityServiceEntity, (service) => service.news, {
    nullable: false,
  })
  @JoinColumn({ name: 'serviceId' })
  service: CommunityServiceEntity;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  mainImageId?: string;

  @OneToMany(() => FileEntity, (file) => file.news, { nullable: true })
  files?: FileEntity[];
}
