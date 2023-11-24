import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInRequest } from '../types/user-request.type';
import { RequestExtended } from '../types/request-extended.type';

export const User = createParamDecorator(
  (
    key: keyof UserInRequest,
    context: ExecutionContext,
  ): boolean | string | UserInRequest => {
    const request = context.switchToHttp().getRequest<RequestExtended>();
    const user = request.user;
    return key ? user[key] : user;
  },
);
