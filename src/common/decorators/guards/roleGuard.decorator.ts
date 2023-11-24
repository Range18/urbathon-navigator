import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../../types/roles.type';
import { RolesGuardClass } from '../../guards/role.guard';

export const RolesGuard = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuardClass));
