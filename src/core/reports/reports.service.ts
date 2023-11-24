import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { BaseEntityService } from '../../common/base-entity.service';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class ReportsService extends BaseEntityService<Report> {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly userService: UserService,
  ) {
    super(reportRepository);
  }
  async create(createReportDto: CreateReportDto) {
    const user = await this.userService.findOne({
      where: { uuid: createReportDto.userUUID },
    });

    if (!user) {
      new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    return await this.save({
      user: user,
      address: createReportDto.address,
      text: createReportDto.text,
    });
  }
}
