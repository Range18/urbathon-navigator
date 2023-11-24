import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verify-links')
export class VerificationLinkEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  readonly userUUID: string;

  @Column({ nullable: false })
  @Generated('uuid')
  readonly code: string;

  @CreateDateColumn()
  readonly createdAt: Date;
}
