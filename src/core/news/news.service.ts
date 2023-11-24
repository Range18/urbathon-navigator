import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { BaseEntityService } from '../../common/base-entity.service';
import { NewsEntity } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService extends BaseEntityService<NewsEntity> {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {
    super(newsRepository);
  }
  create(createNewsDto: CreateNewsDto) {
    return 'This action adds a new news';
  }
}
