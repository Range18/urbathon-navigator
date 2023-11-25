import { IsPositive, IsString } from 'class-validator';

export class MakeVoteDto {
  @IsString()
  readonly userId: string;

  @IsPositive()
  readonly pollId: number;

  @IsString()
  readonly optionName: string;
}
