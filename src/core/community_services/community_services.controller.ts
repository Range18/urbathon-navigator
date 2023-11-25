import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommunityServices_Service } from './community_services.service';
import { CreateCommunityServiceDto } from './dto/create-community_service.dto';
import { UpdateCommunityServiceDto } from './dto/update-community_service.dto';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { IsVerified } from '../../common/decorators/guards/isVerified.decorator';
import { RolesGuard } from '../../common/decorators/guards/roleGuard.decorator';

@Controller('services')
export class CommunityServicesController {
  constructor(
    private readonly communityServicesService: CommunityServices_Service,
  ) {}
  @RolesGuard('admin')
  @IsVerified()
  @AuthGuard()
  @Post()
  async create(@Body() createCommunityServiceDto: CreateCommunityServiceDto) {
    const service = await this.communityServicesService.create(
      createCommunityServiceDto,
    );

    return {
      name: service.name,
    };
  }

  @Get()
  findAll() {
    return this.communityServicesService.find({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityServicesService.findOne({ where: { id } });
  }

  @RolesGuard('service', 'admin')
  @IsVerified()
  @AuthGuard()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunityServiceDto: UpdateCommunityServiceDto,
  ) {
    return this.communityServicesService.updateOne(
      { where: { id } },
      updateCommunityServiceDto,
    );
  }

  @RolesGuard('admin')
  @IsVerified()
  @AuthGuard()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityServicesService.removeOne({ where: { id } });
  }
}
