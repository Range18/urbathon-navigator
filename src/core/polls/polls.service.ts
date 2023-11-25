import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { BaseEntityService } from '../../common/base-entity.service';
import { PollEntity } from './entities/poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsService } from '../news/news.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import { MakeVoteDto } from './dto/make-vote.dto';
import { UserService } from '../users/user.service';
import NewsExceptions = AllExceptions.NewsExceptions;
import UserExceptions = AllExceptions.UserExceptions;
import PollExceptions = AllExceptions.PollExceptions;

@Injectable()
export class PollsService extends BaseEntityService<PollEntity> {
  constructor(
    @InjectRepository(PollEntity)
    private readonly pollsRepository: Repository<PollEntity>,
    private readonly newsService: NewsService,
    private readonly userService: UserService,
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

    return poll;
  }

  async vote(makeVoteDto: MakeVoteDto): Promise<PollEntity> {
    const user = await this.userService.findOne({
      where: { uuid: makeVoteDto.userId },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const poll = await this.findOne({
      where: { id: makeVoteDto.pollId },
      relations: { post: true },
    });

    if (!poll) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'PollExceptions',
        PollExceptions.PollNotFound,
      );
    }

    const optionsArray = Object.entries(poll.options);

    const optionsKeys = Object.keys(poll.options);
    if (!optionsKeys.includes(makeVoteDto.optionName)) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'PollExceptions',
        PollExceptions.OptionNotFound,
      );
    }

    for (const option of optionsArray) {
      if (option[1].includes(makeVoteDto.userId)) {
        const index = option[1].indexOf(makeVoteDto.userId);
        option[1].splice(index, 1);
      }
    }

    const optionsObject = Object.fromEntries(optionsArray);

    optionsObject[makeVoteDto.optionName].push(makeVoteDto.userId);

    poll.options = optionsObject;

    return await this.save(poll);
  }
}
