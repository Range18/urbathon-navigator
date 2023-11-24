import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuardClass } from '../../guards/auth.guard';

export const AuthGuard = () => {
  return applyDecorators(UseGuards(AuthGuardClass));
};
