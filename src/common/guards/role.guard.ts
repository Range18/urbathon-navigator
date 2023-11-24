import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestExtended } from '../types/request-extended.type';
import { UserService } from '../../core/users/user.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuardClass implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestExtended>();

    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      (context.getHandler(), context.getClass()),
    ]);

    if (!roles) {
      return true;
    }

    if (roles.includes(req.user?.role)) {
      return true;
    }

    return false;
  }
}
