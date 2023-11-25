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
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.reportsService.create(createReportDto);
  }

  @Get()
  async findAll() {
    return await this.reportsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportsService.findOne({ where: { uuid: id } });
  }

  @Get(':userId')
  async findAllUserId(@Param('userId') userId: string) {
    return await this.reportsService.findOne({
      where: { user: { uuid: userId } },
    });
  }

  @Get(':address')
  async findAllAddress(@Param('address') address: string) {
    return await this.reportsService.findOne({
      where: { address },
    });
  }
  @IsVerified()
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string, @User('uuid') uuid: string) {
    return await this.reportsService.removeOne({
      where: { uuid: id, user: { uuid } },
    });
  }
}
