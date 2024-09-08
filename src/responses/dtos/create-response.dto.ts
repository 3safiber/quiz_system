import { IsBoolean, IsString } from 'class-validator';
import { Question } from 'src/questions/question.entity';

export class CreateResponseDto {
  @IsString()
  quiz_id: string;

  @IsString()
  question_id: string;

  @IsString()
  selected_option_id: string;
}
