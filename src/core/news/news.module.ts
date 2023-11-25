import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { CommunityServiceEntity } from '../community_services/entities/community_service.entity';
import { CommunityServicesModule } from '../community_services/community_services.module';
import { UserModule } from '../users/user.module';
import { StorageModule } from '../storage/storage.module';
import { FileEntity } from '../storage/entity/file.entity';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, CommunityServiceEntity, FileEntity]),
    UserModule,
    CommunityServicesModule,
    SessionModule,
    TokenModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
