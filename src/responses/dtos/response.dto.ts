import { Expose, Transform } from 'class-transformer';
export class ResponseDto {
  @Expose()
  id: string;

  @Transform(({ obj }) => obj.user_id.id)
  @Expose()
  user_id: string;

  @Transform(({ obj }) => obj.quiz_id.id)
  @Expose()
  quiz_id: string;

  @Transform(({ obj }) => obj.question_id.id)
  @Expose()
  question_id: string;

  @Transform(({ obj }) => obj.selected_option_id.id)
  @Expose()
  selected_option_id: string;
}
