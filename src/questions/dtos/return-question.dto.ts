import { Expose, Transform } from 'class-transformer';
export class ReturnQuestionDto {
  @Expose()
  question_text: string;

  @Expose()
  question_type: string;
}
