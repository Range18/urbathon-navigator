import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  readonly tittle: string;

  @IsString()
  readonly text: string;

  @IsString()
  readonly address: string;

  @IsString()
  @IsOptional()
  mainImageId?: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}