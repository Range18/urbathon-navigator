import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommunityServiceDto } from './dto/create-community_service.dto';
import { UpdateCommunityServiceDto } from './dto/update-community_service.dto';
import { BaseEntityService } from '../../common/base-entity.service';
import { CommunityServiceEntity } from './entities/community_service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CommunityServices_Service extends BaseEntityService<CommunityServiceEntity> {
  constructor(
    @InjectRepository(CommunityServiceEntity)
    private readonly communityServiceRepository: Repository<CommunityServiceEntity>,
    private readonly authService: AuthService,
  ) {
    super(communityServiceRepository);
  }
  async create(
    createCommunityServiceDto: CreateCommunityServiceDto,
  ): Promise<CommunityServiceEntity> {
    const service = await this.findOne({
      where: { user: { email: createCommunityServiceDto.email } },
    });

    if (service) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        'UserExceptions',
        UserExceptions.UserAlreadyExists,
      );
    }

    const userDto = await this.authService.register({
      name: createCommunityServiceDto.name,
      surname: '',
      city: createCommunityServiceDto.city,
      role: 'service',
      email: createCommunityServiceDto.email,
      password: createCommunityServiceDto.password,
    });

    await this.authService.logout(userDto.refreshToken);

    const serviceEntity = await this.save({
      name: createCommunityServiceDto.name,
      user: { uuid: userDto.uuid },
      type: createCommunityServiceDto.type,
      description: createCommunityServiceDto.description,
    });

    return serviceEntity;
  }
}
