import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RequestExtended } from '../types/request-extended.type';
import { UserService } from '../../core/users/user.service';
import { Reflector } from '@nestjs/core';
import { ApiException } from '../exception-handler/api-exception';
import { AllExceptions } from '../exception-handler/exeption-types/all-exceptions';
import AuthExceptions = AllExceptions.AuthExceptions;

@Injectable()
export class RolesGuardClass implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestExtended>();

    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    if (!roles.includes(req.user?.role)) {
      throw new ApiException(
        HttpStatus.FORBIDDEN,
        'AuthExceptions',
        AuthExceptions.Forbidden,
      );
    }

    return true;
  }
}
