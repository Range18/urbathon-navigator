import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { type Response } from 'express';
import { SessionService } from './session.service';
import { Cookie } from '../../common/decorators/cookie.decorator';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { backendServer } from '../../common/configs/config';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Cookie('refreshToken') refreshToken: string,
  ): Promise<LoggedUserRdo> {
    const newSession = await this.sessionService.refreshSession(refreshToken);

    response.cookie('refreshToken', newSession.refreshToken, {
      expires: newSession.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return new LoggedUserRdo(
      newSession.refreshToken,
      newSession.accessToken,
      newSession.sessionExpireAt,
      newSession.uuid,
    );
  }
}
