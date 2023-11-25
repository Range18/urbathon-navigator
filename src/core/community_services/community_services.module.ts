import { Module } from '@nestjs/common';
import { CommunityServices_Service } from './community_services.service';
import { CommunityServicesController } from './community_services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityServiceEntity } from './entities/community_service.entity';
import { UserEntity } from '../users/user.entity';
import { AuthModule } from '../auth/auth.module';
import { NewsEntity } from '../news/entities/news.entity';
import { TokenModule } from '../token/token.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityServiceEntity, UserEntity, NewsEntity]),
    AuthModule,
    SessionModule,
    UserModule,
    TokenModule,
  ],
  controllers: [CommunityServicesController],
  providers: [CommunityServices_Service],
  exports: [CommunityServices_Service],
})
export class CommunityServicesModule {}
