import { IsBoolean, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  question_id: string;

  @IsString()
  option_text: string;

  @IsBoolean()
  is_correct: boolean;
}
