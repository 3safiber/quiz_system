import { Expose, Transform } from 'class-transformer';
export class OptionDto {
  @Expose()
  id: string;

  @Transform(({ obj }) => obj.question_id.id)
  @Expose()
  question_id: string;

  @Expose()
  option_text: string;

  @Expose()
  is_correct: boolean;

  @Transform(({ obj }) => obj.created_by?.id)
  @Expose()
  created_by: string;

  @Transform(({ obj }) => obj.updated_by?.id)
  @Expose()
  updated_by: string;
}
