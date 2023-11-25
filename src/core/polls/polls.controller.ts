import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { GetPollDto } from './dto/get-poll.dto';
import { User } from '../../common/decorators/User.decorator';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    const poll = await this.pollsService.create(createPollDto);

    return new GetPollDto(
      poll.id,
      poll.title,
      poll.options,
      poll.post.uuid,
      poll.createdAt,
    );
  }

  @Get()
  async findAll() {
    return await this.pollsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.pollsService.findOne({ where: { id } });
  }

  @AuthGuard()
  @Post('/:id/vote/')
  async vote(
    @Param('id') id: number,
    @Query('option') option: string,
    @User('uuid') uuid: string,
  ) {
    return await this.pollsService.vote({
      pollId: id,
      optionName: option,
      userId: uuid,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
  //   return this.pollsService.update(+id, updatePollDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pollsService.remove(+id);
  // }
}
