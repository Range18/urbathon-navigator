import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { FileEntity } from '../../storage/entity/file.entity';

@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

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
