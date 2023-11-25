import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/configs/database.config';
import { UserModule } from './core/users/user.module';
import { AuthModule } from './core/auth/auth.module';
import { SessionModule } from './core/session/session.module';
import { VerificationModule } from './core/verification/verification.module';
import { NewsModule } from './core/news/news.module';
import { CommunityServicesModule } from './core/community_services/community_services.module';
import { StorageModule } from './core/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    SessionModule,
    VerificationModule,
    NewsModule,
    CommunityServicesModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
