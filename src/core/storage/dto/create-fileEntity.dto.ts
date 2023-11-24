import { IsString } from 'class-validator';

export class CreateFileEntityDto {
  @IsString()
  filename: string;

  @IsString()
  originalName: string;

  @IsString()
  mimetype: string;

  @IsString()
  size: number;

  @IsString()
  newsId: string;
}
