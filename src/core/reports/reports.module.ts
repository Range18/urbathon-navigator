import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { UserModule } from '../users/user.module';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, UserEntity]), UserModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
