import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../news/entities/news.entity';
import { PollEntity } from './entities/poll.entity';
import { NewsModule } from '../news/news.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, PollEntity]),
    NewsModule,
    SessionModule,
    UserModule,
  ],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [PollsService],
})
export class PollsModule {}
