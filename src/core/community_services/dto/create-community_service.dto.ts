import { IsOptional, IsString } from 'class-validator';

export class CreateCommunityServiceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

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
