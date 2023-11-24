import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/user.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.reports, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  text: string;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @CreateDateColumn()
  readonly createdAt: Date;
}
