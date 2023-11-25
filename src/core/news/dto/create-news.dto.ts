import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;

  @IsString()
  readonly address: string;

  @IsString()
  @IsOptional()
  preview?: string;
}
