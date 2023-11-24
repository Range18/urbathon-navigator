import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
