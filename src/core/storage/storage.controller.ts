import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { IsVerified } from '../../common/decorators/guards/isVerified.decorator';
import { RolesGuard } from '../../common/decorators/guards/roleGuard.decorator';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @RolesGuard('service', 'admin')
  @IsVerified()
  @AuthGuard()
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('newsId') newsId: string,
  ) {
    await this.storageService.uploadFile({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      newsId: newsId,
    });
  }

  @RolesGuard('service', 'admin')
  @IsVerified()
  @AuthGuard()
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('newsId') newsId: string,
  ) {
    await this.storageService.uploadFiles(files, newsId);
  }

  @Get(':name')
  async getFile(@Param('name') filename: string) {}
}
