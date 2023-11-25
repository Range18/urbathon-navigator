import { IsObject, IsString } from 'class-validator';

export class CreatePollDto {
  @IsString()
  readonly title: string;

  @IsObject()
  readonly options: { [key in string]: any };

  @IsString()
  readonly newsId: string;
}
