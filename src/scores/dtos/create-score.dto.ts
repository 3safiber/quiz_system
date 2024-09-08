import { IsString } from 'class-validator';

export class CreateScoreDto {
  @IsString()
  user_id: string;

  @IsString()
  quiz_id: string;
}
