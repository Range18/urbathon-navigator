import { IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;

  @IsString()
  readonly address: string;
}
