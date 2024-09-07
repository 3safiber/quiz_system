import { IsString } from 'class-validator';

export class CreateQuestionsDto {
  @IsString()
  quiz_id: string;

  @IsString()
  question_text: string;

  @IsString()
  question_type: string;
}
