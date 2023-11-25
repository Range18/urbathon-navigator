import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import { BaseEntityService } from '../../common/base-entity.service';
import { VerificationLinkEntity } from './verification.entity';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { UserEntity } from '../users/user.entity';
import UserExceptions = AllExceptions.UserExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;

@Injectable()
export class VerificationService extends BaseEntityService<VerificationLinkEntity> {
  constructor(
    @InjectRepository(VerificationLinkEntity)
    private readonly verLinkRepository: Repository<VerificationLinkEntity>,
    private readonly userService: UserService,
  ) {
    super(verLinkRepository);
  }

  async createLink(user: UserEntity): Promise<string> {
    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }
    return (await this.save({ userUUID: user.uuid })).code;
  }

  async verify(code: string): Promise<void> {
    const linkEntity = await this.findOne({ where: { code } });

    if (!linkEntity) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'AuthExceptions',
        AuthExceptions.InvalidVerify,
      );
    }

    const user = await this.userService.findOne({
      where: { uuid: linkEntity.userUUID },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    await this.userService.updateOne(user, { isVerified: true });

    await this.removeOne(linkEntity);
  }
}
