import { IsBoolean, IsString } from 'class-validator';
import { Question } from 'src/questions/question.entity';

export class CreateOptionDto {
  @IsString()
  question_id: Question;

  @IsString()
  option_text: string;

  @IsBoolean()
  is_correct: boolean;
}
