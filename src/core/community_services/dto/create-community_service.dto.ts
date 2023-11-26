import { IsOptional, IsString } from 'class-validator';
import { postType } from '../types/post.type';

export class CreateCommunityServiceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly type: postType;

  @IsString()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
