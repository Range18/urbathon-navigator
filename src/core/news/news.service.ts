import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { BaseEntityService } from '../../common/base-entity.service';
import { NewsEntity } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;
import { StorageService } from '../storage/storage.service';
import { FileEntity } from '../storage/entity/file.entity';

@Injectable()
export class NewsService extends BaseEntityService<NewsEntity> {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {
    super(newsRepository);
  }
  async create(
    createNewsDto: CreateNewsDto,
    userId: string,
  ): Promise<NewsEntity> {
    const user = await this.userService.findOne({ where: { uuid: userId } });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const files: FileEntity[] = [];
    for (const id of createNewsDto.images) {
      files.push(await this.storageService.findOne({ where: { uuid: id } }));
    }

    return await this.save({
      title: createNewsDto.tittle,
      text: createNewsDto.text,
      address: createNewsDto.address,
      service: { user: user },
      mainImageId: createNewsDto.mainImageId,
      files: files,
    });
  }
}
