import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { BaseEntityService } from '../../common/base-entity.service';
import { PollEntity } from './entities/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsService } from '../news/news.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import NewsExceptions = AllExceptions.NewsExceptions;

@Injectable()
export class PollsService extends BaseEntityService<PollEntity> {
  constructor(
    @InjectRepository(PollEntity)
    private readonly pollsRepository: Repository<PollEntity>,
    private readonly newsService: NewsService,
  ) {
    super(pollsRepository);
  }
  async create(createPollDto: CreatePollDto) {
    const post = await this.newsService.findOne({
      where: { uuid: createPollDto.newsId },
      relations: { polls: true },
    });

    if (!post) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'NewsExceptions',
        NewsExceptions.NewsNotFound,
      );
    }

    const poll = await this.save({
      title: createPollDto.title,
      options: createPollDto.options,
      post: post,
    });

    post.polls.push(poll);
    await this.newsService.save(post);

    return post;
  }
}
