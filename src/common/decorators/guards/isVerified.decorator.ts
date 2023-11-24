import { applyDecorators, UseGuards } from '@nestjs/common';
import { IsVerifiedGuard } from '../../guards/isVerified.guard';

export const IsVerified = () => {
  return applyDecorators(UseGuards(IsVerifiedGuard));
};
