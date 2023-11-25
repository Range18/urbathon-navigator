import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { IsVerified } from '../../common/decorators/guards/isVerified.decorator';
import { RolesGuard } from '../../common/decorators/guards/roleGuard.decorator';
import { User } from '../../common/decorators/User.decorator';
import { UserInRequest } from '../../common/types/user-request.type';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @RolesGuard('service', 'admin')
  @IsVerified()
  @AuthGuard()
  @Post()
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @User() user: UserInRequest,
  ) {
    return await this.newsService.create(createNewsDto, user.uuid);
  }

  @Get()
  findAll() {
    return this.newsService.find({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne({ where: { uuid: id } });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
  //   return this.newsService.update(+id, updateNewsDto);
  // }

  @RolesGuard('service', 'admin')
  @IsVerified()
  @AuthGuard()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.removeOne({ where: { uuid: id } });
  }
}
