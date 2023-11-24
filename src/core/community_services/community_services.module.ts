import { Module } from '@nestjs/common';
import { CommunityServices_Service } from './community_services.service';
import { CommunityServicesController } from './community_services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityServiceEntity } from './entities/community_service.entity';
import { UserEntity } from '../users/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityServiceEntity, UserEntity]),
    AuthModule,
  ],
  controllers: [CommunityServicesController],
  providers: [CommunityServices_Service],
  exports: [CommunityServicesController],
})
export class CommunityServicesModule {}
