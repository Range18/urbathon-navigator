import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';
import { AllExceptions } from '../exception-handler/exeption-types/all-exceptions';
import { UserService } from '../../core/users/user.service';
import { SessionService } from '../../core/session/session.service';
import { TokenService } from '../../core/token/token.service';
import { ApiException } from '../exception-handler/api-exception';
import { TokenPayload } from '../../core/session/types/user.payload';
import SessionExceptions = AllExceptions.SessionExceptions;
import UserExceptions = AllExceptions.UserExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;
@Injectable()
export class AuthGuardClass implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: object; session: object }>();

    const accessToken = this.extractAccessToken(request);

    if (!accessToken) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'AuthExceptions',
        AuthExceptions.InvalidAccessToken,
      );
    }

    const payload: TokenPayload =
      await this.tokenService.verifyAsync<TokenPayload>(accessToken);

    const user = await this.userService.findOne({
      where: { uuid: payload.userUUID },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const session = await this.sessionService.findOne({
      where: { sessionId: payload.sessionId },
    });

    if (!session) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'SessionExceptions',
        SessionExceptions.SessionNotFound,
      );
    }

    request['user'] = {
      uuid: user.uuid,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    };

    request['session'] = {
      sessionId: session.sessionId,
      expireAt: session.expireAt,
    };

    return true;
  }

  private extractAccessToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' || type === 'Access-Token' ? token : undefined;
  }
}
