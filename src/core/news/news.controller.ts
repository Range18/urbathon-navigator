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
import { GetNewsRdo } from './dto/get-news.rdo';

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
  ): Promise<GetNewsRdo> {
    const post = await this.newsService.create(createNewsDto, user.uuid);
    return new GetNewsRdo(
      post.uuid,
      post.title,
      post.text,
      post.address,
      undefined,
      post.service,
    );
  }

  @Get()
  async findAll() {
    const posts = await this.newsService.find({
      relations: { files: true, service: true },
    });
    return posts.map(
      (post) =>
        new GetNewsRdo(
          post.uuid,
          post.title,
          post.text,
          post.address,
          post.files[0],
          post.service,
        ),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.newsService.findOne({
      where: { uuid: id },
      relations: { files: true, service: true },
    });
    return new GetNewsRdo(
      post.uuid,
      post.title,
      post.text,
      post.address,
      post.files[0],
      post.service,
    );
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
