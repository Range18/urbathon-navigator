import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { BaseEntityService } from '../../common/base-entity.service';
import { FileEntity } from './entity/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateFileEntityDto } from './dto/create-fileEntity.dto';
import { NewsService } from '../news/news.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import { resolve } from 'path';
import { unlink } from 'fs/promises';
import * as process from 'process';
import { storageConfig } from '../../common/configs/storage.config';
import { createReadStream } from 'fs';
import FileExceptions = AllExceptions.FileExceptions;
import NewsExceptions = AllExceptions.NewsExceptions;

@Injectable()
export class StorageService extends BaseEntityService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly newsService: NewsService,
  ) {
    super(fileRepository);
  }

  async uploadFile(createFileEntityDto: CreateFileEntityDto) {
    if (!createFileEntityDto.newsId) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'NewsExceptions',
        NewsExceptions.NewsNotFound,
      );
    }
    const news = await this.newsService.findOne({
      where: { uuid: createFileEntityDto?.newsId },
      relations: { files: true },
    });

    if (!news) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'NewsExceptions',
        NewsExceptions.NewsNotFound,
      );
    }

    if (news.files.length != 0) {
      await this.removeOne(news.files[0]);
    }

    const file = await this.save({
      filename: createFileEntityDto.filename,
      originalName: createFileEntityDto.originalName,
      mimetype: createFileEntityDto.mimetype,
      size: createFileEntityDto.size,
      news: news,
    });

    news.files.push(file);
    await this.newsService.save(news);

    return file;
  }

  async uploadFiles(files: Express.Multer.File[], newsId: string) {
    const news = await this.newsService.findOne({
      where: { uuid: newsId },
    });

    if (!news) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'NewsExceptions',
        NewsExceptions.NewsNotFound,
      );
    }

    const fileEntities = files.map(async (file) => {
      return await this.save({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        news: news,
      });
    });

    await this.newsService.save(news);

    return fileEntities;
  }

  async getFileStream(
    filename: string,
  ): Promise<{ stream: StreamableFile; mimetype: string }> {
    const file = await this.findOne({ where: { filename } });

    if (!file) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'FileExceptions',
        FileExceptions.FileNotFound,
      );
    }

    const readableFile = createReadStream(
      resolve(storageConfig.path, file.filename),
    );

    return {
      stream: new StreamableFile(readableFile),
      mimetype: file.mimetype,
    };
  }

  async removeOne(
    optionsOrEntity: FindOneOptions<FileEntity> | FileEntity,
    throwError = false,
  ): Promise<FileEntity> {
    const file = await super.removeOne(optionsOrEntity, throwError);
    await unlink(resolve(storageConfig.path, file.filename));
    return file;
  }
}
