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
  ) {
    super(newsRepository);
  }
  async create(
    createNewsDto: CreateNewsDto,
    userId: string,
  ): Promise<NewsEntity> {
    const user = await this.userService.findOne({
      where: { uuid: userId },
      relations: { service: true },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    // const files: { uuid: string }[] = [];
    //
    // for (const id of createNewsDto.images) {
    //   files.push({ uuid: id });
    // }

    return await this.save({
      title: createNewsDto.title,
      text: createNewsDto.text,
      address: createNewsDto.address,
      service: user.service,
    });
  }
}
