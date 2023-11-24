import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import UserExceptions = AllExceptions.UserExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;
import { RequestExtended } from '../types/request-extended.type';
import { ApiException } from '../exception-handler/api-exception';
import { AllExceptions } from '../exception-handler/exeption-types/all-exceptions';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestExtended>();
    const user = request.user;

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    if (!user.isVerified) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'AuthExceptions',
        AuthExceptions.AccountIsNotVerified,
      );
    }

    return true;
  }
}
