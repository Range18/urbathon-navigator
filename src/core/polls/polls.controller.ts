import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.create(createPollDto);
  }

  @Get()
  async findAll() {
    return await this.pollsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.pollsService.findOne({ where: { id } });
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