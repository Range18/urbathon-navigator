import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { storageConfig } from '../../common/configs/storage.config';
import { diskStorage } from 'multer';
import { fileFilter, generateFilename } from './multer.utility';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entity/file.entity';
import { NewsEntity } from '../news/entities/news.entity';
import { NewsModule } from '../news/news.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../users/user.module';
import { TokenModule } from '../token/token.module';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: storageConfig.path,
        filename: generateFilename,
      }),
      fileFilter: fileFilter,
    }),
    TypeOrmModule.forFeature([FileEntity, NewsEntity]),
    UserModule,
    NewsModule,
    SessionModule,
    TokenModule,
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
