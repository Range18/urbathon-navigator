import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { storageConfig } from '../../common/configs/storage.config';
import { diskStorage } from 'multer';
import { fileFilter, generateFilename } from './multer.utility';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: storageConfig.path,
        filename: generateFilename,
      }),
      fileFilter: fileFilter,
    }),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
