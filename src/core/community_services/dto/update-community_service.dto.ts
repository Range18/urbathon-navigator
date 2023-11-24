import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityServiceDto } from './create-community_service.dto';

export class UpdateCommunityServiceDto extends PartialType(
  CreateCommunityServiceDto,
) {}
