import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Report } from '../reports/entities/report.entity';
import { CommunityServiceEntity } from '../community_services/entities/community_service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Report, CommunityServiceEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
