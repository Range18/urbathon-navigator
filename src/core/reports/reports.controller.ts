import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { IsVerified } from '../../common/decorators/guards/isVerified.decorator';
import { User } from '../../common/decorators/User.decorator';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @IsVerified()
  @AuthGuard()
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.find({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne({ where: { uuid: id } });
  }

  @Get(':userId')
  findAllUserId(@Param('userId') userId: string) {
    return this.reportsService.findOne({ where: { user: { uuid: userId } } });
  }

  @IsVerified()
  @AuthGuard()
  @Delete(':id')
  remove(@Param('id') id: string, @User('uuid') uuid: string) {
    return this.reportsService.removeOne({
      where: { uuid: id, user: { uuid } },
    });
  }
}
