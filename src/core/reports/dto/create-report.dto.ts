import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  userUUID: string;

  @IsString()
  address: string;

  @IsString()
  text: string;
}
